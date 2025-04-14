'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nich-fashion-be documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' :
                                            'id="xs-controllers-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' :
                                        'id="xs-injectables-links-module-AppModule-f79e9bfd7351451fceb658b46ecf7ac1ec14d4cd34dc023f02d9e06bddc3b7d18390b718d12aece80590c75a0586133e22262f22e98c93662127690022b14466"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' :
                                            'id="xs-controllers-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' :
                                        'id="xs-injectables-links-module-AuthModule-39448dad9a45be34afc82985ee360f6482c8df97d9a2234f1965a7219c20ba11c70fcec69af366613f7c25824295870f9565db41d45d6d807563b4bc81fd39db"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GenerateTokensProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GenerateTokensProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OtpSigninProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OtpSigninProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshTokenProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshTokenProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BankTransfersModule.html" data-type="entity-link" >BankTransfersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' : 'data-bs-target="#xs-controllers-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' :
                                            'id="xs-controllers-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' }>
                                            <li class="link">
                                                <a href="controllers/BankTransfersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankTransfersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' : 'data-bs-target="#xs-injectables-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' :
                                        'id="xs-injectables-links-module-BankTransfersModule-07a39927ab125df4875328ac5e230051ba7aa374e7316706930621b08ee5ceada1c886905de088d6a0dacbcd79744a7b64f5c7263c3c08eeebd4fcf1bfd472b5"' }>
                                        <li class="link">
                                            <a href="injectables/BankTransfersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BankTransfersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ConfirmBankTransferProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmBankTransferProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SaveBankTransferProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveBankTransferProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeliveryStatesModule.html" data-type="entity-link" >DeliveryStatesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' : 'data-bs-target="#xs-controllers-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' :
                                            'id="xs-controllers-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' }>
                                            <li class="link">
                                                <a href="controllers/DeliveryStatesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryStatesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' : 'data-bs-target="#xs-injectables-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' :
                                        'id="xs-injectables-links-module-DeliveryStatesModule-d3b8e1a49d7de72d0bb42247a52adbe525778c33fc1e7f8dd7045603e01f8c4b86a9720631db997cd3724cccf92e21e8009a42607555f592650b1fa3e98c22d1"' }>
                                        <li class="link">
                                            <a href="injectables/DeliveryStatesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeliveryStatesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscountsModule.html" data-type="entity-link" >DiscountsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' : 'data-bs-target="#xs-controllers-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' :
                                            'id="xs-controllers-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' }>
                                            <li class="link">
                                                <a href="controllers/DiscountsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' : 'data-bs-target="#xs-injectables-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' :
                                        'id="xs-injectables-links-module-DiscountsModule-7823fb590c0df7c93c88fc6b6cf778b0362575fabf02cf5fe03e217189c1f9506c825cf63484c591bdbb2c481f3243c0050c05594c7e68ca5858714f130af06a"' }>
                                        <li class="link">
                                            <a href="injectables/ApplyForDiscountProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApplyForDiscountProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateDiscountProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateDiscountProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DiscountsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DiscountsUsageModule.html" data-type="entity-link" >DiscountsUsageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-DiscountsUsageModule-42794db172c43251436dd271acac7178bd1265655e20af71a706481d708179656fee25d6d256cb0d9fdd5c30680502ce51194567057b3ff8bb4dd696702b969e"' : 'data-bs-target="#xs-injectables-links-module-DiscountsUsageModule-42794db172c43251436dd271acac7178bd1265655e20af71a706481d708179656fee25d6d256cb0d9fdd5c30680502ce51194567057b3ff8bb4dd696702b969e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-DiscountsUsageModule-42794db172c43251436dd271acac7178bd1265655e20af71a706481d708179656fee25d6d256cb0d9fdd5c30680502ce51194567057b3ff8bb4dd696702b969e"' :
                                        'id="xs-injectables-links-module-DiscountsUsageModule-42794db172c43251436dd271acac7178bd1265655e20af71a706481d708179656fee25d6d256cb0d9fdd5c30680502ce51194567057b3ff8bb4dd696702b969e"' }>
                                        <li class="link">
                                            <a href="injectables/DiscountsUsageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DiscountsUsageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-955a0ec6414179326b595e2ae60362e0b52cb824bc0f9f5cc7332a524f78164a9e10a840e078de224486b7594a3620e20bcb03983b9a0d275281a02eb158ae19"' : 'data-bs-target="#xs-injectables-links-module-MailModule-955a0ec6414179326b595e2ae60362e0b52cb824bc0f9f5cc7332a524f78164a9e10a840e078de224486b7594a3620e20bcb03983b9a0d275281a02eb158ae19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-955a0ec6414179326b595e2ae60362e0b52cb824bc0f9f5cc7332a524f78164a9e10a840e078de224486b7594a3620e20bcb03983b9a0d275281a02eb158ae19"' :
                                        'id="xs-injectables-links-module-MailModule-955a0ec6414179326b595e2ae60362e0b52cb824bc0f9f5cc7332a524f78164a9e10a840e078de224486b7594a3620e20bcb03983b9a0d275281a02eb158ae19"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' : 'data-bs-target="#xs-controllers-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' :
                                            'id="xs-controllers-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' : 'data-bs-target="#xs-injectables-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' :
                                        'id="xs-injectables-links-module-OrdersModule-b602e037198c09f345d2bb227ade9404b880406d475b71c3d8cb86898e18c274f77d51537fb04cfdcd3e502ee3c391bdfff9b70bae54aed3e7a6a4b71dab1b3b"' }>
                                        <li class="link">
                                            <a href="injectables/FindAllOrdersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllOrdersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' :
                                        'id="xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaymentsModule.html" data-type="entity-link" >PaymentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' : 'data-bs-target="#xs-controllers-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' :
                                            'id="xs-controllers-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' }>
                                            <li class="link">
                                                <a href="controllers/PaymentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' : 'data-bs-target="#xs-injectables-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' :
                                        'id="xs-injectables-links-module-PaymentsModule-e5072282a2af2742a025f7d1fca1743fe47d72c192d17600a5d179b11b3b9108cb1acc513d865a1bbe8b99f5c15bb869a00a323b416d0c6f5918a1a606dff5b5"' }>
                                        <li class="link">
                                            <a href="injectables/FindAllPaymentsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllPaymentsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaymentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaymentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaystackModule.html" data-type="entity-link" >PaystackModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' : 'data-bs-target="#xs-controllers-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' :
                                            'id="xs-controllers-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' }>
                                            <li class="link">
                                                <a href="controllers/PaystackController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaystackController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' : 'data-bs-target="#xs-injectables-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' :
                                        'id="xs-injectables-links-module-PaystackModule-631a79012b302517be63794fd7ed28f56fa14495277ac24c09b142933b59a70398c2df656164d6854ea9c89d728d9c080c1edcf9aa383c3b047db6508f6fa83c"' }>
                                        <li class="link">
                                            <a href="injectables/InitiatePaymentProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InitiatePaymentProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PaystackService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaystackService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/VerifyPaymentProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VerifyPaymentProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductImagesModule.html" data-type="entity-link" >ProductImagesModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductImagesModule-b4a0607fd0baa72efecccdbf7d36249b79be07ecef43ed522c8c0a0589f1c94632e8e53f767fb90ee04b357eecc9881b104f07499ec5790b1ade05dfc491b0e5"' : 'data-bs-target="#xs-injectables-links-module-ProductImagesModule-b4a0607fd0baa72efecccdbf7d36249b79be07ecef43ed522c8c0a0589f1c94632e8e53f767fb90ee04b357eecc9881b104f07499ec5790b1ade05dfc491b0e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductImagesModule-b4a0607fd0baa72efecccdbf7d36249b79be07ecef43ed522c8c0a0589f1c94632e8e53f767fb90ee04b357eecc9881b104f07499ec5790b1ade05dfc491b0e5"' :
                                        'id="xs-injectables-links-module-ProductImagesModule-b4a0607fd0baa72efecccdbf7d36249b79be07ecef43ed522c8c0a0589f1c94632e8e53f767fb90ee04b357eecc9881b104f07499ec5790b1ade05dfc491b0e5"' }>
                                        <li class="link">
                                            <a href="injectables/ProductImagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductImagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductsModule.html" data-type="entity-link" >ProductsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' : 'data-bs-target="#xs-controllers-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' :
                                            'id="xs-controllers-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' }>
                                            <li class="link">
                                                <a href="controllers/ProductsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' : 'data-bs-target="#xs-injectables-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' :
                                        'id="xs-injectables-links-module-ProductsModule-b16aeb39a8adeaf44bce844db44ea7f06fdb15620ae40d78cb7b5ae4d2c6a3d3ec4ace0084723c44cb5a2487749ed3a7d7b70ed188dbad1a7e1674adc623d7b5"' }>
                                        <li class="link">
                                            <a href="injectables/CreateProductProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateProductProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindAllProductsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllProductsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ProductsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateProductProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateProductProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductVariantsModule.html" data-type="entity-link" >ProductVariantsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' : 'data-bs-target="#xs-controllers-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' :
                                            'id="xs-controllers-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' }>
                                            <li class="link">
                                                <a href="controllers/ProductVariantsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductVariantsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' : 'data-bs-target="#xs-injectables-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' :
                                        'id="xs-injectables-links-module-ProductVariantsModule-226c17b60bb331d6b824464fa211dc392d4b8a5615dcf16753ec428f17c066c326bc5bdcf7d7561ae3e22be5cf90a52c4a43dd1b6deb3568650afb750ea5447a"' }>
                                        <li class="link">
                                            <a href="injectables/ProductVariantsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductVariantsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReviewsModule.html" data-type="entity-link" >ReviewsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' : 'data-bs-target="#xs-controllers-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' :
                                            'id="xs-controllers-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' }>
                                            <li class="link">
                                                <a href="controllers/ReviewsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' : 'data-bs-target="#xs-injectables-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' :
                                        'id="xs-injectables-links-module-ReviewsModule-9c6f43f330da099cc2497afd86c6f162b6f889d5448059160bb41ae94f1b1e5ad50bcd0cb44643ca2fbbaca32349362052fafdfe8f7e5a2914851f1741ea9cc8"' }>
                                        <li class="link">
                                            <a href="injectables/CreateReviewProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateReviewProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ReviewsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubscribersModule.html" data-type="entity-link" >SubscribersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' : 'data-bs-target="#xs-controllers-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' :
                                            'id="xs-controllers-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' }>
                                            <li class="link">
                                                <a href="controllers/SubscribersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' : 'data-bs-target="#xs-injectables-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' :
                                        'id="xs-injectables-links-module-SubscribersModule-7884d80945b71609759a8088b9f53705bd763494a84c8063213849ebe68797764f789b134ccc1efbfc8344e8892d2e2a21eacd8e16bde5db05124f260789a8d2"' }>
                                        <li class="link">
                                            <a href="injectables/FindAllSubscribersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindAllSubscribersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubscribersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscribersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadsModule.html" data-type="entity-link" >UploadsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' : 'data-bs-target="#xs-injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' :
                                        'id="xs-injectables-links-module-UploadsModule-60f1d3a268d54d9daf88336a84c7a0db0d54606ef6aa9fde770fd49dfcc70fc7000c4655855748c60e089316ef764bbdc67ed65d743a30b5653a19fb16a22fbd"' }>
                                        <li class="link">
                                            <a href="injectables/UploadToAwsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadToAwsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' :
                                            'id="xs-controllers-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' :
                                        'id="xs-injectables-links-module-UsersModule-d7fe209b44ee71cc1c02272949de11b7e639d81ed839b71aeafaa0890fe49eea079dd20fc6b5adf24c6db25a196636f4b743e14b37a676d202087ee740ff98f7"' }>
                                        <li class="link">
                                            <a href="injectables/ClearOtpAndExpiryTimeProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClearOtpAndExpiryTimeProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CreateUsersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUsersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByIdProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByIdProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneUserByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneUserByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindUserByOtpAndExpiryTimeProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindUserByOtpAndExpiryTimeProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StoreOtpAndExpireProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StoreOtpAndExpireProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BankTransfer.html" data-type="entity-link" >BankTransfer</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DeliveryState.html" data-type="entity-link" >DeliveryState</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Discount.html" data-type="entity-link" >Discount</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DiscountUsage.html" data-type="entity-link" >DiscountUsage</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Order.html" data-type="entity-link" >Order</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Payment.html" data-type="entity-link" >Payment</a>
                                </li>
                                <li class="link">
                                    <a href="entities/PaymentVariant.html" data-type="entity-link" >PaymentVariant</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Product.html" data-type="entity-link" >Product</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductImage.html" data-type="entity-link" >ProductImage</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ProductVariant.html" data-type="entity-link" >ProductVariant</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Review.html" data-type="entity-link" >Review</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Subscriber.html" data-type="entity-link" >Subscriber</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApplyForDiscountDto.html" data-type="entity-link" >ApplyForDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBankTransferDto.html" data-type="entity-link" >CreateBankTransferDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDeliveryStateDto.html" data-type="entity-link" >CreateDeliveryStateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateDiscountDto.html" data-type="entity-link" >CreateDiscountDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductDto.html" data-type="entity-link" >CreateProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateProductVariantDto.html" data-type="entity-link" >CreateProductVariantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReviewDto.html" data-type="entity-link" >CreateReviewDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSubscriberDto.html" data-type="entity-link" >CreateSubscriberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOrdersBaseDto.html" data-type="entity-link" >GetOrdersBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetOrdersDto.html" data-type="entity-link" >GetOrdersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPaymentsBaseDto.html" data-type="entity-link" >GetPaymentsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPaymentsDto.html" data-type="entity-link" >GetPaymentsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsBaseDto.html" data-type="entity-link" >GetProductsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetProductsDto.html" data-type="entity-link" >GetProductsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSubscribersBaseDto.html" data-type="entity-link" >GetSubscribersBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetSubscribersDto.html" data-type="entity-link" >GetSubscribersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersBaseDto.html" data-type="entity-link" >GetUsersBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersDto.html" data-type="entity-link" >GetUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InitiatePaymentDto.html" data-type="entity-link" >InitiatePaymentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OtpSigninDto.html" data-type="entity-link" >OtpSigninDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchOrderDto.html" data-type="entity-link" >PatchOrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchProductDto.html" data-type="entity-link" >PatchProductDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchProductVariantDto.html" data-type="entity-link" >PatchProductVariantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductsWithVariantsDto.html" data-type="entity-link" >ProductsWithVariantsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductWithVariantDto.html" data-type="entity-link" >ProductWithVariantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductWithVariantDto-1.html" data-type="entity-link" >ProductWithVariantDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenDto.html" data-type="entity-link" >RefreshTokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDeliveryStateDto.html" data-type="entity-link" >UpdateDeliveryStateDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/DataResponseInterceptor.html" data-type="entity-link" >DataResponseInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveUserData.html" data-type="entity-link" >ActiveUserData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});