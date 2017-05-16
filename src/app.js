import {inject, NewInstance} from 'aurelia-dependency-injection';
import {ValidationController, ValidationRules, validateTrigger} from 'aurelia-validation';
import {CustomValidationFormRenderer} from 'resources/validation-renderer';

@inject(NewInstance.of(ValidationController))
export class App {
  constructor(validationController) {
    this.validationController = validationController;
    this.validationController.validateTrigger = validateTrigger.change;
    this.validationController.addRenderer(new CustomValidationFormRenderer);
  }

  activate() {
    VeLib.core.init()
      .then(() => {
        console.log('velib init');
      });
  }
}


ValidationRules
  .ensure('fullname')
    .required()
  .ensure('ssn')
    .required()
    .minLength(10)
    .maxLength(10)
  .on(App);
