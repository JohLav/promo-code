export default class ReductionCalculator {
  constructor(askReductionInput, promoCode, weatherService) {
    this.promoCode = promoCode;
    this.weatherService = weatherService;

    this.inputArguments = askReductionInput.arguments;
  }

  async askReduction() {
    const reasonsToDeny = this.buildReasonsToDeny(this.promoCode.restrictions);

    if (reasonsToDeny.thereIsNoReasonToDeny()) {
      return {
        promocode_name: this.promoCode.name,
        avantage: this.promoCode.avantage,
        status: "accepted",
      };
    }

    return {
      promocode_name: this.promoCode.name,
      reasons: reasonsToDeny.reasons,
      status: "denied",
    };
  }

  buildReasonsToDeny(restrictions) {
    const reasonsToDeny = {
      reasons: {},
    };
    if (restrictions.age) {
      if (this.ageValidity(restrictions))
        reasonsToDeny.reasons.age = this.ageValidity(restrictions);
    }
    if (restrictions.date) {
      if (this.dateValidity(restrictions))
        reasonsToDeny.reasons.date = this.dateValidity(restrictions);
    }
    if (restrictions.weather) {
      if (restrictions.weather.is && this.weatherValidity(restrictions))
        reasonsToDeny.reasons.weather = this.weatherValidity(restrictions);
      if (restrictions.weather.temp && this.temperatureValidity(restrictions))
        reasonsToDeny.reasons.weather = this.temperatureValidity(restrictions);
    }
    if (restrictions.or) {
      const childReasonsToDeny = [];
      restrictions.or.forEach((restriction) => {
        childReasonsToDeny.push(this.buildReasonsToDeny(restriction));
      });
      if (
        childReasonsToDeny.filter((reason) => !reason.thereIsNoReasonToDeny())
          .length !== 0
      ) {
        reasonsToDeny.reasons.age = childReasonsToDeny.map(
          (it) => it.reasons.age,
        );
      }
    }

    reasonsToDeny.thereIsNoReasonToDeny = () =>
      !reasonsToDeny.reasons.age &&
      !reasonsToDeny.reasons.date &&
      !reasonsToDeny.reasons.weather;
    return reasonsToDeny;
  }

  ageValidity(restrictions) {
    if (
      restrictions.age.eq &&
      this.inputArguments.age !== restrictions.age.eq
    ) {
      return "isNotEq";
    }
    if (restrictions.age.lt && this.inputArguments.age > restrictions.age.lt) {
      return "isNotLt";
    }
    if (restrictions.age.gt && this.inputArguments.age < restrictions.age.gt) {
      return "isNotGt";
    }
  }

  dateValidity(restrictions) {
    if (this.inputArguments.date <= restrictions.date.after) {
      return "isNotAfter";
    }
    if (this.inputArguments.date >= restrictions.date.before) {
      return "isNotBefore";
    }
  }

  weatherValidity(restrictions) {
    if (
      restrictions.weather.is === "clear" &&
      restrictions.weather.is !==
        this.weatherService.getWeather(this.inputArguments.weather.town)
    ) {
      return "isNotClear";
    }
    if (
      restrictions.weather.is === "clouds" &&
      restrictions.weather.is !==
        this.weatherService.getWeather(this.inputArguments.weather.town)
    ) {
      return "isNotCloudy";
    }
  }

  temperatureValidity(restrictions) {
    if (
      this.weatherService.getTemperature(this.inputArguments.weather.town) >=
      restrictions.weather.temp.lt
    ) {
      return "isNotLt";
    }
    if (
      this.weatherService.getTemperature(this.inputArguments.weather.town) <=
      restrictions.weather.temp.gt
    ) {
      return "isNotGt";
    }
  }
}
