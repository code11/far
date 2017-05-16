define('app',['exports', 'aurelia-dependency-injection', 'aurelia-validation', 'resources/validation-renderer'], function (exports, _aureliaDependencyInjection, _aureliaValidation, _validationRenderer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaDependencyInjection.NewInstance.of(_aureliaValidation.ValidationController)), _dec(_class = function () {
    function App(validationController) {
      _classCallCheck(this, App);

      this.validationController = validationController;
      this.validationController.validateTrigger = _aureliaValidation.validateTrigger.change;
      this.validationController.addRenderer(new _validationRenderer.CustomValidationFormRenderer());
    }

    App.prototype.activate = function activate() {
      VeLib.core.init('https://verified-dev.c11.io').then(function () {
        console.log('velib inifdsfdt');
      });
    };

    return App;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('fullname').required().ensure('ssn').required().minLength(10).maxLength(10).on(App);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
      aurelia.use.plugin('aurelia-validation');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/validation-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CustomValidationFormRenderer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CustomValidationFormRenderer = exports.CustomValidationFormRenderer = function () {
    function CustomValidationFormRenderer() {
      _classCallCheck(this, CustomValidationFormRenderer);
    }

    CustomValidationFormRenderer.prototype.render = function render(instruction) {
      for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var _ref5 = _ref2;
        var result = _ref5.result,
            elements = _ref5.elements;

        for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref6 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref6 = _i3.value;
          }

          var element = _ref6;

          this.remove(element, result);
        }
      }

      for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref7 = _ref4;
        var result = _ref7.result,
            elements = _ref7.elements;

        for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref8;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref8 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref8 = _i4.value;
          }

          var _element = _ref8;

          this.add(_element, result);
        }
      }
    };

    CustomValidationFormRenderer.prototype.add = function add(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      formGroup.classList.add('has-error');

      var message = document.createElement('span');
      message.className = 'help-block validation-message';
      message.textContent = result.message;
      message.id = 'validation-message-' + result.id;
      formGroup.appendChild(message);
    };

    CustomValidationFormRenderer.prototype.remove = function remove(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      var message = formGroup.querySelector('#validation-message-' + result.id);
      if (message) {
        formGroup.removeChild(message);

        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-error');
        }
      }
    };

    return CustomValidationFormRenderer;
  }();
});
define('resources/elements/true-false-radio',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TrueFalseRadio = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor, _descriptor2;

  var TrueFalseRadio = exports.TrueFalseRadio = (_class = function TrueFalseRadio() {
    _classCallCheck(this, TrueFalseRadio);

    _initDefineProp(this, 'value', _descriptor, this);

    _initDefineProp(this, 'name', _descriptor2, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'value', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('text!far.css', ['module'], function(module) { module.exports = ".help-text {\n  font-weight: lighter;\n}\n"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./styles.css\"></require><require from=\"./far.css\"></require><require from=\"./resources/elements/true-false-radio\"></require><h1>FAR</h1><h2>Ansökan om medlemskap i FAR samt ansökan om att genomgå FARs lönekonsultexamen</h2><fieldset><ul if.bind=\"validationController.errors\"><li repeat.for=\"error of validationController.errors\">${error.message}</li></ul><legend>Allmänna uppgifter</legend><div class=\"form-group\"><label for=\"fullname\">Förnamn och efternamn</label><input value.bind=\"fullname & validate\" type=\"text\" id=\"fullname\" placeholder=\"Anton Oter\" autofocus></div><div class=\"form-group\"><label for=\"ssn\">Personnummer</label><input value.bind=\"ssn & validate\" type=\"text\" id=\"ssn\" placeholder=\"ÅÅMMDDNNNC\"></div><div class=\"form-group\"><label for=\"company\">Företag</label><input value.bind=\"company\" type=\"text\" id=\"company\" placeholder=\"Navn på foretag\"></div><div class=\"form-group\"><label for=\"orgnr\">Organisationsnummer</label><input value.bind=\"orgnr\" type=\"text\" id=\"orgnr\" placeholder=\"\"></div><div class=\"form-group\"><label for=\"address\">Besöksadress</label><input value.bind=\"address\" type=\"text\" id=\"address\" placeholder=\"\"></div><div class=\"form-group\"><label for=\"postadress\">Postadress</label><input value.bind=\"postadress\" type=\"text\" id=\"postadress\" placeholder=\"\"></div><div class=\"form-group\"><label for=\"mobile\">Mobiltlf</label><input value.bind=\"mobile\" type=\"text\" id=\"mobile\" placeholder=\"\"></div><div class=\"form-group\"><label for=\"email\">E-post (löpande information från FAR kommer att skickas till denna E-post)</label><input value.bind=\"email\" type=\"email\" id=\"email\" placeholder=\"\"></div><div class=\"form-group\"><label for=\"website\">Webbplats</label><input value.bind=\"website\" type=\"text\" id=\"website\" placeholder=\"www.dittdomene.se\"></div></fieldset><fieldset><legend>Företaget innehar ansvarsförsäkring</legend><div class=\"form-group\"><true-false-radio name=\"insurance\" value.bind=\"insurance\"></true-false-radio></div></fieldset><fieldset><legend>Alternativ</legend><div class=\"form-group\"><input type=\"radio\" model.bind=\"1\" id=\"alternative1\" name=\"alternative\" checked.bind=\"alternative\"><label for=\"alternative1\">Alternativ 1 – Huvudregeln – Examen från universitet eller högskola (180 p)</label><p>Har akademisk examen med företagsekonomisk inriktning om minst 180 hp (tre års heltidsstudier). I examen ska ingå minst 60 p företagsekonomi, 15 p skatt, 15 p juridik eller utländsk examen av motsvarande omfattning. (Bifoga examensbevis).</p></div><div class=\"form-group\"><input type=\"radio\" model.bind=\"2\" id=\"alternative2\" name=\"alternative\" checked.bind=\"alternative\"><label for=\"alternative2\">Alternativ 2 – Enstaka kurser från universitet eller högskola (120 p)</label><p>Har genomgått enstaka kurser på universitet/högskola om minst 120 hp (två års heltidsstudier), varav minst 60 p företagsekonomi, 15 p skatt, 15 p juridik samt 30 p inom relevanta ämnen. (Bifoga kursintyg).</p></div><div class=\"form-group\"><input type=\"radio\" model.bind=\"3\" id=\"alternative3\" name=\"alternative\" checked.bind=\"alternative\"><label for=\"alternative3\">Alternativ 3 – Annan eftergymnasial utbildning</label><p>Har av FAR godkänd eftergymnasial utbildning med inriktning mot företagsekonomi om minst två år, motsvarande 120 hp (två års heltidsstudier/400 Yh-poäng), varav - 60 hp företagsekonomi (200 Yh-poäng), - 15 hp skatt (50 Yh-poäng), - 15 hp juridik (50 Yh-poäng) och - 30 hp inom relevanta ämnen (100 Yh-poäng). (Bifoga examensbevis).</p></div><div class=\"form-group\"><input type=\"radio\" model.bind=\"4\" id=\"alternative4\" name=\"alternative\" checked.bind=\"alternative\"><label for=\"alternative4\">Alternativ 4 – Ansökan enligt övergångsregel – gällande t.o.m. 31 december 2017 – med anledning av lång erfarenhet</label><p></p></div><div class=\"form-group\"><input type=\"radio\" model.bind=\"5\" id=\"alternative5\" name=\"alternative\" checked.bind=\"alternative\"><label for=\"alternative5\">Alternativ 5 – Ansökan enligt övergångsregel – gällande t.o.m. 31 december 2017 – med anledning av medlemskap som auktoriserad redovisningskonsult i Srf konsulterna</label><p></p></div></fieldset><fieldset show.bind=\"alternative === 1\"><legend>Alternativ 1</legend><label for=\"alternative1_experience\">Praktik - antall år</label><span class=\"help-text\">Har minst 3 års praktik från redovisningsbyrå eller revisionsbyrå</span> <input id=\"alternative1_experience\" type=\"number\" value.bind=\"alternative1.experience\"><label for=\"alternative1_description\">Beskrivning av praktiken (alt. bifoga CV)</label><textarea id=\"alternative1_description\" value.bind=\"alternative1.description\"></textarea></fieldset><fieldset show.bind=\"alternative === 2\"><legend>Alternativ 2</legend><label for=\"alternative2_experience\">Praktik - antall år</label><span class=\"help-text\">Har minst 5 års praktik från redovisningsbyrå eller revisionsbyrå</span> <input id=\"alternative2_experience\" type=\"number\" value.bind=\"alternative2.experience\"><label for=\"alternative2_description\">Beskrivning av praktiken (alt. bifoga CV)</label><textarea id=\"alternative2_description\" value.bind=\"alternative2.description\"></textarea></fieldset><fieldset show.bind=\"alternative === 3\"><legend>Alternativ 3</legend><label for=\"alternative3_experience\">Praktik - antall år</label><span class=\"help-text\">Har minst 5 års praktik från redovisningsbyrå eller revisionsbyrå</span> <input id=\"alternative3_experience\" type=\"number\" value.bind=\"alternative3.experience\"><label for=\"alternative3_description\">Beskrivning av praktiken (alt. bifoga CV)</label><textarea id=\"alternative3_description\" value.bind=\"alternative3.description\"></textarea></fieldset><fieldset show.bind=\"alternative === 4\"><legend>Alternativ 4</legend><label for=\"alternative4_experience\">Praktik - antall år</label><span class=\"help-text\">Har minst 12 års dokumenterad erfarenhet som redovisningskonsult med uppdragsverksamhet</span> <input id=\"alternative4_experience\" type=\"number\" value.bind=\"alternative4.experience\"><label for=\"alternative4_description\">Beskriv din erfarenhet som redovisningskonsult samt nuvarande arbetsuppgifter</label><textarea id=\"alternative4_description\" value.bind=\"alternative4.description\"></textarea></fieldset><fieldset show.bind=\"alternative === 5\"><legend>Alternativ 5</legend><p>Ansöker enligt övergångsregel om befrielse från kravet på utbildning, praktik (alternativ 1, 2 och 3 ovan) och/eller kravet på att genomgå redovisningskonsultexamen baserat på medlemskap i Srf konsulterna som auktoriserad redovisningskonsult. (Bifoga intyg, t.ex. medlemsbevis från Srf konsulterna)</p><div class=\"form-group\"><true-false-radio name=\"alternative5_free\" value.bind=\"alternative5.free\"></true-false-radio></div><p>Har redovisningsuppdrag enligt Reko i ett revisionsföretag eller ett redovisningsföretag.</p><div class=\"form-group\"><true-false-radio name=\"alternative5_reko_or_company\" value.bind=\"alternative5.reko_or_company\"></true-false-radio></div><p>Har genomgått Srf konsulternas kvalitetskontroll för redovisningsverksamhet eller vara beredd att genomgå FARs kvalitetskontroll för redovisningsverksamhet inom ett år. ( I förekommande fall, bifoga kopia av intyg från Srf konsulternas kvalitetskontroll).</p><div class=\"form-group\"><true-false-radio name=\"alternative5_qos\" value.bind=\"alternative5.qos\"></true-false-radio></div><div class=\"form-group\"><label for=\"alternative5_description\">Beskriv nuvarande arbetsuppgifter</label><textarea id=\"alternative5_description\" value.bind=\"alternative5.description\"></textarea></div></fieldset><fieldset show.bind=\"alternative && alternative !== 5\"><legend>Redovisningskonsultexamen</legend><p>I samband med ansökan om medlemskap ansöker jag om att få genomgå redovisningskonsultexamen samt en auktorisationsdag för redovisningskonsulter. Datum för examen och auktorisationsdag kommer att meddelas senare.</p><p>Sökanden rekommenderas att även genomgå förberedelsekurs inför redovisningskonsultexamen.</p><p>Medlemskap i FAR som redovisningskonsult förutsätter att godkänt resultat erhållits i FARs redovisningskonsultexamen samt att övriga invalskrav är uppfyllda.</p><div class=\"form-group\"><true-false-radio name=\"exam\" value.bind=\"exam\"></true-false-radio></div></fieldset><fieldset><legend>Referenser till två medlemmar i FAR</legend><template repeat.for=\"idx of [0, 1]\">Medlem ${$index + 1}<div class=\"form-group\"><label for=\"reference${idx}_name\">Namn</label><input type=\"text\" id=\"reference${idx}_name\" value.bind=\"references[idx].name\"></div><div class=\"form-group\"><label for=\"reference${idx}_company\">Byrå</label><input type=\"text\" id=\"reference${idx}_company\" value.bind=\"references[idx].company\"></div><div class=\"form-group\"><label for=\"reference${idx}_email\">E-post</label><input type=\"text\" id=\"reference${idx}_email\" value.bind=\"references[idx].email\"></div><div class=\"form-group\"><label for=\"reference${idx}_mobile\">Mobil</label><input type=\"text\" id=\"reference${idx}_mobile\" value.bind=\"references[idx].mobile\"></div></template></fieldset><fieldset><legend>Behandling av personuppgifter</legend><p>I enlighet med personuppgiftslagen (1998:204) informeras du om att personuppgifterna i din ansökan kommer att behandlas i FARs ärenderegister. FAR org.nr 556081-7974, Box 6417, 113 82 Stockholm, ansvarar för att personuppgifterna behandlas på ett korrekt sätt. Ändamålet med behandlingen är att pröva din ansökan om inträde i organisationen och för att kunna utföra kvalitetskontroller enligt FARs stadgar. Du har rätt att en gång per år få ta del av de personuppgifter som finns registrerade om dig. Du har även rätt att begära att felaktiga uppgifter korrigeras. Ansökan om information och rättelse ska vara skriftlig och ställas till FAR. Ytterligare information finns på FAR webbplats, https://www.farakademi.se/om-oss/allmanna-villkor/personuppgiftslagen/</p></fieldset><fieldset><legend>Samtycke enligt personuppgiftslagen (PUL)</legend><p>Om jag blir medlem samtycker jag till att mitt namn och min e-postadress publiceras i FARs medlemsregister på FARs webbplats.</p><div class=\"form-group\"><true-false-radio name=\"accept\" value.bind=\"accept\"></true-false-radio></div></fieldset><fieldset><legend>Övriga uppgifter som sökanden vill åberopa</legend><div class=\"form-group\"><label for=\"other_info\"></label><textarea id=\"other_info\" value.bind=\"other_info\"></textarea></div></fieldset><fieldset><legend>Innsending</legend>Jag försäkrar att jag inte<ul><li>är i konkurs</li><li>är underkastad näringsförbud</li><li>har förvaltare enligt 11 kap. 7 § föräldrabalken</li><li>är förbjuden att lämna juridiskt eller ekonomiskt biträde enligt 3 § lagen (1985:354) om förbud mot juridiskt eller ekonomiskt biträde i vissa fall eller</li><li>är föremål för någon motsvarande rådighetsinskränkning i en annan stat</li></ul><p>Härmed intygar jag att ovanstående uppgifter är korrekta samt att jag kommer att följa bestämmelserna i FARs stadgar och regler för god yrkessed.</p><div class=\"form-group\"><true-false-radio name=\"legal\" value.bind=\"legal\"></true-false-radio></div><input type=\"button\" value=\"Send inn sökanden\"></fieldset></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "/* line 34, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n::-webkit-input-placeholder {\n  font-weight: 300;\n  color: #999; }\n\n/* line 37, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n::-moz-placeholder {\n  font-weight: 300;\n  color: #999; }\n\n/* line 40, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n::-ms-input-placeholder {\n  font-weight: 300;\n  color: #999; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nbody {\n  font-size: 1.4rem;\n  font-family: \"Open Sans\", sans-serif;\n  color: #444;\n  line-height: 1.5; }\n\n/* line 7, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nh1 {\n  font-size: 2.8rem;\n  font-weight: 600;\n  margin: 4rem 0 0.5rem; }\n\n/* line 11, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nh2 {\n  font-size: 2rem;\n  font-weight: 600;\n  margin: 3rem 0 0.5rem; }\n\n/* line 16, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nh3 {\n  font-size: 1.6rem;\n  font-weight: 600;\n  margin: 2rem 0 0.5rem; }\n\n/* line 22, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n.alert > h1,\nh1 + p, .alert > h2,\nh2 + p, .alert > h3,\nh3 + p {\n  margin-top: 0; }\n\n/* line 25, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nh1 .thin, h2 .thin, h3 .thin {\n  font-weight: 400; }\n\n/* line 28, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n.align-right {\n  float: right; }\n\n/* line 31, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n.thin {\n  font-weight: 400; }\n\n/* line 40, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\na {\n  color: #398ECF;\n  cursor: pointer; }\n  /* line 37, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n  a:hover {\n    text-decoration: underline;\n    color: #62a5d9; }\n\n/* line 46, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\nblockquote {\n  font-weight: 600;\n  font-style: italic;\n  position: relative;\n  padding-left: 4rem;\n  margin: 0; }\n  /* line 52, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n  blockquote:before {\n    content: '\"';\n    font-size: 4rem;\n    position: absolute;\n    left: 0rem;\n    margin-top: -1rem; }\n\n/* line 59, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n.marker {\n  background-color: Yellow; }\n\n/* line 18, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type='text'],\ninput[type='email'],\ninput[type='password'],\ninput[type='url'],\ninput[type='number'],\ninput[type='tel'],\ntextarea {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  background-color: #fff;\n  box-sizing: border-box;\n  -webkit-border-radius: 0.2rem;\n  -moz-border-radius: 0.2rem;\n  -ms-border-radius: 0.2rem;\n  border-radius: 0.2rem;\n  border: 1px solid #ccc;\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: #444;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  max-width: 440px; }\n  /* line 13, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type='text'].ng-invalid,\n  input[type='email'].ng-invalid,\n  input[type='password'].ng-invalid,\n  input[type='url'].ng-invalid,\n  input[type='number'].ng-invalid,\n  input[type='tel'].ng-invalid,\n  textarea.ng-invalid {\n    border: 1px solid #F77 !important;\n    background-color: #FFF3F3; }\n  /* line 29, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  td input[type='text'],\n  .col input[type='text'], td\n  input[type='email'],\n  .col\n  input[type='email'], td\n  input[type='password'],\n  .col\n  input[type='password'], td\n  input[type='url'],\n  .col\n  input[type='url'], td\n  input[type='number'],\n  .col\n  input[type='number'], td\n  input[type='tel'],\n  .col\n  input[type='tel'], td\n  textarea,\n  .col\n  textarea {\n    border-color: #f3f3f3;\n    max-width: 100%; }\n  /* line 34, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type='text'].underline,\n  input[type='email'].underline,\n  input[type='password'].underline,\n  input[type='url'].underline,\n  input[type='number'].underline,\n  input[type='tel'].underline,\n  textarea.underline {\n    background-color: transparent;\n    border: 0;\n    border-bottom: 1px solid #666; }\n  /* line 39, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  table.stripped td input[type='text'], table.stripped td\n  input[type='email'], table.stripped td\n  input[type='password'], table.stripped td\n  input[type='url'], table.stripped td\n  input[type='number'], table.stripped td\n  input[type='tel'], table.stripped td\n  textarea {\n    border-color: #aaa; }\n\n/* line 48, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"] + label + input[type='text'],\ninput[type=\"radio\"] + label + input[type='text'], input[type=\"checkbox\"] + label +\ninput[type='email'],\ninput[type=\"radio\"] + label +\ninput[type='email'], input[type=\"checkbox\"] + label +\ninput[type='password'],\ninput[type=\"radio\"] + label +\ninput[type='password'], input[type=\"checkbox\"] + label +\ninput[type='url'],\ninput[type=\"radio\"] + label +\ninput[type='url'], input[type=\"checkbox\"] + label +\ninput[type='number'],\ninput[type=\"radio\"] + label +\ninput[type='number'], input[type=\"checkbox\"] + label +\ninput[type='tel'],\ninput[type=\"radio\"] + label +\ninput[type='tel'] {\n  width: 100px;\n  display: inline-block;\n  margin-left: -1rem;\n  margin-right: 3rem; }\n\n\n/* line 58, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\nlabel {\n  display: block;\n  margin-bottom: 0.5rem;\n  font-size: 1.4rem; }\n\n/* line 63, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\nselect {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 1rem;\n  background-color: #fff;\n  box-sizing: border-box;\n  -webkit-border-radius: 0.2rem;\n  -moz-border-radius: 0.2rem;\n  -ms-border-radius: 0.2rem;\n  border-radius: 0.2rem;\n  border: 1px solid #ccc;\n  font-size: 1.4rem;\n  font-weight: 600;\n  color: #444; }\n  /* line 13, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  select.ng-invalid {\n    border: 1px solid #F77 !important;\n    background-color: #FFF3F3; }\n\n/* line 66, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n.radio-with-input {\n  display: inline-block; }\n\n/* line 69, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\nb.required {\n  color: #BD2121; }\n\n/* line 85, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  display: none; }\n\n/* line 89, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"] + label,\ninput[type=\"radio\"] + label {\n  display: inline-block;\n  position: relative;\n  padding-left: 2.4rem;\n  margin-right: 3rem;\n  font-weight: 600;\n  cursor: pointer; }\n  /* line 98, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type=\"checkbox\"] + label:before, input[type=\"checkbox\"] + label:after,\n  input[type=\"radio\"] + label:before,\n  input[type=\"radio\"] + label:after {\n    box-sizing: border-box;\n    width: 1.6rem;\n    height: 1.6rem;\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0.3rem; }\n  /* line 108, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type=\"checkbox\"] + label:before,\n  input[type=\"radio\"] + label:before {\n    border: 1px solid #999;\n    display: block;\n    background-color: #fff; }\n  /* line 113, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type=\"checkbox\"] + label:after,\n  input[type=\"radio\"] + label:after {\n    display: none; }\n\n/* line 120, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"].ng-invalid-required + label:before, input[type=\"checkbox\"].ng-invalid-required + label:after,\ninput[type=\"radio\"].ng-invalid-required + label:before,\ninput[type=\"radio\"].ng-invalid-required + label:after {\n  border: 1px solid #F77 !important;\n  background-color: #FFF3F3 !important; }\n\n/* line 130, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"radio\"] + label:before {\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%; }\n\n/* line 134, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"radio\"]:checked + label:after {\n  display: block;\n  -webkit-border-radius: 50%;\n  -moz-border-radius: 50%;\n  -ms-border-radius: 50%;\n  border-radius: 50%;\n  width: 1rem;\n  height: 1rem;\n  left: 0.3rem;\n  top: 0.6rem;\n  background-color: #398ECF; }\n\n/* line 144, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"] + label:before {\n  -webkit-border-radius: 0.2rem;\n  -moz-border-radius: 0.2rem;\n  -ms-border-radius: 0.2rem;\n  border-radius: 0.2rem; }\n\n/* line 149, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"]:checked + label:before {\n  border-color: #398ECF;\n  background-color: #398ECF; }\n\n/* line 152, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\ninput[type=\"checkbox\"]:checked + label:after {\n  display: block;\n  left: 0.56rem;\n  top: 0.56rem;\n  /*Make it a small rectangle so the border will create an L-shape*/\n  width: 0.56rem;\n  height: 0.88rem;\n  /*Add a white border on the bottom and left, creating that 'L' */\n  border: solid #fff;\n  border-width: 0 0.2rem  0.2rem 0;\n  /*Rotate the L 45 degrees to turn it into a checkmark*/\n  -webkit-transform: rotate(45deg);\n  -moz-transform: rotate(45deg);\n  -ms-transform: rotate(45deg);\n  transform: rotate(45deg); }\n\n/* line 168, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n.loader {\n  display: block;\n  height: 50px;\n  background: url(../assets/loader.gif) no-repeat center center;\n  color: transparent; }\n\n/* line 2, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\ninput[type='button'],\ninput[type='submit'],\n.btn {\n  background-color: #398ECF;\n  border: 1px solid #398ECF;\n  padding: 1.3rem 2rem;\n  margin-bottom: 1rem;\n  -webkit-border-radius: 0.4rem;\n  -moz-border-radius: 0.4rem;\n  -ms-border-radius: 0.4rem;\n  border-radius: 0.4rem;\n  color: #fff;\n  font-size: 1.4rem;\n  cursor: pointer;\n  text-decoration: none; }\n  /* line 14, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\n  input[type='button']:hover,\n  input[type='submit']:hover,\n  .btn:hover {\n    text-decoration: none;\n    color: #fff;\n    background-color: #4e9ad4; }\n  /* line 18, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\n  input[type='button']:focus, input[type='button']:active,\n  input[type='submit']:focus,\n  input[type='submit']:active,\n  .btn:focus,\n  .btn:active {\n    outline: 0 !important; }\n  /* line 20, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\n  input[type='button'] + input[type='button'],\n  input[type='button'] + input[type='submit'],\n  input[type='button'] + .btn,\n  input[type='submit'] + input[type='button'],\n  input[type='submit'] + input[type='submit'],\n  input[type='submit'] + .btn,\n  .btn + input[type='button'],\n  .btn + input[type='submit'],\n  .btn + .btn {\n    margin-left: 0.7rem; }\n  /* line 24, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\n  input[type='button'].disabled, input[type='button']:disabled,\n  input[type='submit'].disabled,\n  input[type='submit']:disabled,\n  .btn.disabled,\n  .btn:disabled {\n    opacity: 0.65;\n    color: #eef8ff;\n    border-color: #6aa7d6;\n    background-color: #6aa7d6; }\n    /* line 30, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_buttons.sass */\n    input[type='button'].disabled:hover, input[type='button']:disabled:hover,\n    input[type='submit'].disabled:hover,\n    input[type='submit']:disabled:hover,\n    .btn.disabled:hover,\n    .btn:disabled:hover {\n      cursor: not-allowed; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_alerts.sass */\n.alert {\n  padding: 1rem;\n  border: 1px solid #888;\n  display: block; }\n  /* line 6, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_alerts.sass */\n  .alert.alert-success {\n    background-color: #dff0d8;\n    border-color: #d0e9c6;\n    color: #3c763d; }\n  /* line 10, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_alerts.sass */\n  .alert.alert-info {\n    background-color: #d9edf7;\n    border-color: #bcdff1;\n    color: #31708f; }\n  /* line 14, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_alerts.sass */\n  .alert.alert-warning {\n    background-color: #fcf8e3;\n    border-color: #faf2cc;\n    color: #8a6d3b; }\n  /* line 18, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_alerts.sass */\n  .alert.alert-danger {\n    background-color: #f2dede;\n    border-color: #ebcccc;\n    color: #a94442; }\n\n/* line 6, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\ntable {\n  border-collapse: inherit;\n  border-spacing: 0;\n  border: 0;\n  width: 100% !important; }\n  /* line 11, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n  table td, table th {\n    vertical-align: top; }\n  /* line 13, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n  table td {\n    background-color: #f3f3f3;\n    padding: 1rem;\n    border: 1px solid #fff; }\n\n/* line 17, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\ntable.columns-2 td {\n  width: 50%; }\n\n/* line 20, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n.table-wrapper {\n  width: 100%;\n  overflow-x: auto; }\n\n/* line 25, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\ntable.stripped td {\n  border: 0;\n  border-bottom: 1px solid #ddd;\n  background-color: transparent; }\n\n/* line 31, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\ntable.small td {\n  font-size: 1.2rem;\n  padding: 0.5rem; }\n\n/* line 35, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\ntable.transparent td {\n  background-color: transparent;\n  border-color: transparent; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tooltips.sass */\n.tooltip-message {\n  position: relative; }\n  /* line 3, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tooltips.sass */\n  .tooltip-message:not(:empty) {\n    color: #398ECF;\n    cursor: pointer;\n    vertical-align: middle; }\n    /* line 37, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_texts.sass */\n    .tooltip-message:not(:empty):hover {\n      text-decoration: underline;\n      color: #62a5d9; }\n  /* line 6, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tooltips.sass */\n  .tooltip-message:empty {\n    border: 1px solid #398ECF;\n    width: 20px;\n    display: inline-block;\n    height: 20px;\n    -webkit-border-radius: 40px;\n    -moz-border-radius: 40px;\n    -ms-border-radius: 40px;\n    border-radius: 40px;\n    text-align: center;\n    color: #398ECF;\n    cursor: pointer;\n    font-size: 14px; }\n    /* line 16, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tooltips.sass */\n    .tooltip-message:empty:before {\n      content: '?';\n      display: inline-block;\n      height: 20px;\n      line-height: 20px;\n      vertical-align: top; }\n\n/* line 23, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tooltips.sass */\n.tooltip-box {\n  display: block;\n  padding: 1rem;\n  margin-top: 1rem;\n  margin-bottom: 2rem;\n  background: #efefef;\n  border: 1px solid #ccc; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.inline-block {\n  display: inline-block; }\n\n/* line 4, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.disabled {\n  opacity: 0.65; }\n\n/* line 7, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.m-t-0 {\n  margin-top: 0 !important; }\n\n/* line 10, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.m-b-1 {\n  margin-bottom: 1rem !important; }\n\n/* line 13, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.m-l--3 {\n  margin-left: -3rem !important; }\n\n/* line 15, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.m-l--2 {\n  margin-left: -2rem !important; }\n\n/* line 17, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n.m-l--1 {\n  margin-left: -1rem !important; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_flex-columns.sass */\n.flex-columns {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-direction: normal;\n  -moz-box-direction: normal;\n  -webkit-box-orient: horizontal;\n  -moz-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-pack: stretch;\n  -moz-box-pack: stretch;\n  -webkit-justify-content: stretch;\n  -ms-flex-pack: stretch;\n  justify-content: stretch;\n  -webkit-flex-wrap: wrap;\n  -moz-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-flex-wrap: wrap;\n  -moz-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap; }\n  /* line 206, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col {\n    box-sizing: border-box; }\n  /* line 208, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-1 {\n    width: 100%; }\n  /* line 210, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-2 {\n    width: 50%; }\n  /* line 212, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-3 {\n    width: 33.3%; }\n  /* line 214, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-4 {\n    width: 25%; }\n  /* line 216, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-5 {\n    width: 20%; }\n  /* line 218, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-6 {\n    width: 16.6%; }\n  /* line 220, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-7 {\n    width: 14.28%; }\n  /* line 222, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-8 {\n    width: 12.5%; }\n  /* line 224, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-9 {\n    width: 11.1%; }\n  /* line 226, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_mixins.sass */\n  .flex-columns .col-10 {\n    width: 10%; }\n  /* line 4, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_flex-columns.sass */\n  .flex-columns .col {\n    flex-grow: 1;\n    -webkit-flex-grow: 1;\n    -moz-flex-grow: 1;\n    -ms-flex-grow: 1;\n    background-color: #f3f3f3;\n    padding: 1rem;\n    border: 1px solid #fff; }\n\n/* line 14, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_flex-columns.sass */\n.flex-columns.transparent .col {\n  background-color: transparent;\n  border-color: transparent; }\n\n/* line 1, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\ndiv.data-list {\n  position: relative; }\n  /* line 3, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\n  div.data-list input {\n    width: 100%;\n    background-image: url(\"../assets/dropdown-arrow.png\");\n    background-repeat: no-repeat;\n    background-position: right center; }\n  /* line 8, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\n  div.data-list ul {\n    position: absolute;\n    left: 0;\n    right: 0;\n    margin: 0;\n    padding: 0;\n    border: 1px solid #ddd;\n    background: #f5f5f5;\n    list-style: none;\n    z-index: 3;\n    max-width: 440px; }\n    /* line 19, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\n    div.data-list ul li {\n      padding: 5px 10px;\n      cursor: pointer; }\n      /* line 22, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\n      div.data-list ul li:hover {\n        background: #fcfcfc; }\n\n/* line 26, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_data-lists.sass */\n.outside {\n  z-index: 2;\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0; }\n\n/* line 14, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\nhtml {\n  background: #F3F3F3; }\n\n/* line 17, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\nbody {\n  box-sizing: border-box;\n  padding: 40px;\n  max-width: 920px;\n  margin: 20px auto;\n  background: #fff; }\n\n@media screen {\n  /* line 26, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  html {\n    font-size: 10px; } }\n\n@media screen and (max-width: 920px) {\n  /* line 31, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  html {\n    background: #fff; }\n  /* line 33, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  body {\n    margin: 0; } }\n\n@media screen and (max-width: 767px) {\n  /* line 198, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type='button'],\n  input[type='submit'] {\n    display: block;\n    width: 100%; }\n    /* line 202, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n    input[type='button'] + input[type='button'],\n    input[type='button'] + input[type='submit'],\n    input[type='submit'] + input[type='button'],\n    input[type='submit'] + input[type='submit'] {\n      margin-left: 0rem; }\n  /* line 206, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type=\"checkbox\"] + label,\n  input[type=\"radio\"] + label {\n    display: block; }\n    /* line 210, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n    .radio-with-input input[type=\"checkbox\"] + label, .radio-with-input\n    input[type=\"radio\"] + label {\n      display: inline; }\n  /* line 213, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  .radio-with-input {\n    display: block; }\n  /* line 217, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  .radio-with-input:not(.radio-no-label) input[type='text'] {\n    display: block !important;\n    width: 100% !important;\n    margin: 0.5rem 0 1rem !important; }\n  /* line 10, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_flex-columns.sass */\n  .flex-columns .col {\n    width: 100%; }\n  /* line 22, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_utils.sass */\n  .hidden-sm {\n    display: none !important; }\n  /* line 40, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  body {\n    padding: 20px; } }\n\n@media print {\n  /* line 178, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  input[type='text'],\n  input[type='email'],\n  input[type='password'],\n  input[type='url'],\n  input[type='number'],\n  input[type='tel'],\n  textarea,\n  select {\n    border: none;\n    background: transparent;\n    padding: 0;\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none; }\n  /* line 191, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_forms.sass */\n  .loader,\n  input[type='button'],\n  input[type='submit'] {\n    display: none; }\n  /* line 41, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n  table {\n    border-collapse: collapse; }\n    /* line 43, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n    table, table td {\n      border: 1px solid #eeeeee;\n      background: transparent; }\n    /* line 46, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n    table td {\n      padding: 1rem 1.5rem; }\n  /* line 50, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n  table.stripped, table.stripped td {\n    border: 0; }\n  /* line 52, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_tables.sass */\n  table.stripped td {\n    border-bottom: 1px solid #eeeeee; }\n  /* line 20, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/_flex-columns.sass */\n  .flex-columns .col {\n    border: 1px solid #eeeeee;\n    background: transparent;\n    padding: 1rem 1.5rem; }\n  /* line 49, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  html {\n    font-size: 8pt;\n    background: #fff; }\n  /* line 53, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  body {\n    margin: 0;\n    max-width: 100%; }\n  /* line 57, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  table {\n    page-break-after: auto; }\n  /* line 59, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  tr {\n    page-break-inside: avoid;\n    page-break-after: auto; }\n  /* line 62, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  td {\n    page-break-inside: avoid;\n    page-break-after: auto; }\n  /* line 65, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  thead {\n    display: table-header-group; }\n  /* line 67, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n  tfoot {\n    display: table-footer-group; } }\n\n/** Marius addons **/\n/** Making sure all the masks are properly detected as errors**/\n/** Hiding arrows on some number inputs **/\n/* line 76, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n.hide-arrows::-webkit-inner-spin-button,\n.hide-arrows::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  margin: 0;\n  /** Displaying some input boxes **/ }\n\n/* line 84, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\ninput[type=\"checkbox\"].force-display {\n  display: inline; }\n\n/* line 87, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n.middle {\n  vertical-align: middle; }\n\n/* line 90, C:/Dropbox (CODE11)/Work/Verified/Templates/pubic-template-app/src/_main/sass/style.sass */\n.ng-invalid-mask:not(form) {\n  border: 1px solid #F77;\n  background-color: #FFF3F3; }\n"; });
define('text!resources/elements/true-false-radio.html', ['module'], function(module) { module.exports = "<template><input type=\"radio\" model.bind=\"true\" id=\"${name}_true\" name.bind=\"name\" checked.bind=\"value\"><label for=\"${name}_true\">Ja</label><input type=\"radio\" model.bind=\"false\" id=\"${name}_false\" name.bind=\"name\" checked.bind=\"value\"><label for=\"${name}_false\">Nei</label></template>"; });
//# sourceMappingURL=app-bundle.js.map