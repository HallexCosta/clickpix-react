# [2.1.0-beta.1](https://github.com/HallexCosta/clickpix-react/compare/v2.0.3-beta.2...v2.1.0-beta.1) (2024-12-17)


### Features

* render additionalInfo in PendingPixCharge ([17b2320](https://github.com/HallexCosta/clickpix-react/commit/17b23204a6e5687779d9437ae4eec11f2f8b4894))

## [2.0.3-beta.2](https://github.com/HallexCosta/clickpix-react/compare/v2.0.3-beta.1...v2.0.3-beta.2) (2024-12-17)


### Bug Fixes

* remove all digits from taxID and phone before execute hook crete ([fe905a7](https://github.com/HallexCosta/clickpix-react/commit/fe905a7b914c183070f4c46067327013805e0e88))

## [2.0.3-beta.1](https://github.com/HallexCosta/clickpix-react/compare/v2.0.2...v2.0.3-beta.1) (2024-12-17)


### Bug Fixes

* add z-10 in modal containers ([7b334a9](https://github.com/HallexCosta/clickpix-react/commit/7b334a956d18813a534dfd8f9b085e1b22840a99))
* **modules/checkout:** add ddi in customer phone when create new charge ([a981419](https://github.com/HallexCosta/clickpix-react/commit/a981419c2b681535eb58fae061b1095ebc6abfb8))

## [2.0.2](https://github.com/HallexCosta/clickpix-react/compare/v2.0.1...v2.0.2) (2024-12-16)


### Bug Fixes

* **workflows:** create .env vars before make build ([02e8ffe](https://github.com/HallexCosta/clickpix-react/commit/02e8ffed746dc34a829ddb3f937134bc9293ec09))

# [2.0.0-beta.6](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2024-12-16)


### Bug Fixes

* add GRAPHQL_URL and REST_API_BASE_URL in action build ([ab9790b](https://github.com/HallexCosta/clickpix-react/commit/ab9790bc386bee26b5cbb5a0d0581d396ed266b7))
* adjust error message to inform need a appid ([7b08136](https://github.com/HallexCosta/clickpix-react/commit/7b0813617ea1d03d06f48655d27cb4b9331baca3))
* **workflows:** create .env vars before make build ([34fa680](https://github.com/HallexCosta/clickpix-react/commit/34fa680ef7b60dc70c03d360b92e2122cdb41405))


### Features

* add CopyQRCodeButton ([e78b823](https://github.com/HallexCosta/clickpix-react/commit/e78b823c24cbc278c6d632297d2be9361bb3d266))
* add new icons CircleOk and OK ([82ab1cf](https://github.com/HallexCosta/clickpix-react/commit/82ab1cf2ed8826feaf5e1b77b16b91439a271469))
* add PixChargeEnvironmentBanner ([d1cbba2](https://github.com/HallexCosta/clickpix-react/commit/d1cbba20e6ced5fb43054003d440f7900b810ff8))
* **charge:** add additionalInfoMapper and hideCNPJMask ([2371aa9](https://github.com/HallexCosta/clickpix-react/commit/2371aa9dae4c872dd003ddc42285b8abeb2a2a5f))
* **checkout:** adjust when show checkout, pending, paid or expired modal ([161e2ca](https://github.com/HallexCosta/clickpix-react/commit/161e2cae8cb3f59dec9f49c0d55333b14d5ec4e8))
* **common:** add generateCorrelationUniqueId ([95125a2](https://github.com/HallexCosta/clickpix-react/commit/95125a20d34e9c6cbdb7ec45e2399644f6277dc8))
* **common:** add generic type to createPromiseWithResolvers ([7d6229c](https://github.com/HallexCosta/clickpix-react/commit/7d6229c98dfcbce7093b87d6fcc22295b2d3a5ea))
* desaclople App from index ([b2aa7eb](https://github.com/HallexCosta/clickpix-react/commit/b2aa7ebffb05baa5c35ffccea6af3559c8835eaf))
* **modules/charge:** add checkIsExpiredCharge ([4d12309](https://github.com/HallexCosta/clickpix-react/commit/4d12309041d6eb10872a2382d67067c8364426b2))
* **modules/charge:** add new ExpiredPixChargeReceipt modal ([feb6ae7](https://github.com/HallexCosta/clickpix-react/commit/feb6ae767f0b00facc7c307c6b8d956ad1f8f9c5))
* **modules/charge:** add new fetchSyncChargeUpdate ([468eadf](https://github.com/HallexCosta/clickpix-react/commit/468eadf2771fe57464710517c4a328922382d77b))
* **modules/charge:** add new PaidPixChargeReceipt component ([a9e58aa](https://github.com/HallexCosta/clickpix-react/commit/a9e58aa8c82458cef1764b25df372c02f7fbd02f))
* **modules/charge:** add new PendingPixCharge component ([53726d0](https://github.com/HallexCosta/clickpix-react/commit/53726d0d559ef1b84b2c6379c290c82c17df6ee7))
* **modules/checkout:** add new props for order type ([33c5b3a](https://github.com/HallexCosta/clickpix-react/commit/33c5b3a1509ee0fb4b3484ca4742d9f53ff79548))
* **modules/clickpix:** add new enums SET_CURRENT_MODAL and SET_SELECTED_PRODUCT_ID ([d9f28f6](https://github.com/HallexCosta/clickpix-react/commit/d9f28f6ad78353eeefbc7ed18f98bab31fd67331))
* **modules/clickpix:** add RenderClickPixButtons wrapper ([0ba621e](https://github.com/HallexCosta/clickpix-react/commit/0ba621e6bfa6808bfd4adcd9b9c6bad827c84f4d))
* **package:** add new dependencies ([4680972](https://github.com/HallexCosta/clickpix-react/commit/4680972de43dac953190ab385efc39315f79493d))
* **providers/woovi:** add createPixChargeRequest ([79f67d4](https://github.com/HallexCosta/clickpix-react/commit/79f67d43347d250e2b74b5b8bb0ce359e3783556))
* **release:** add semantic-release/changelog plugin ([6033482](https://github.com/HallexCosta/clickpix-react/commit/60334829501c6eb44a35314f8234d2e90a27469a))
* **tailwind:** add woovi color ([daeb44c](https://github.com/HallexCosta/clickpix-react/commit/daeb44ce2437be7cfce92164e71067d787345a41))

## [2.0.1](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0...v2.0.1) (2024-12-16)


### Bug Fixes

* add GRAPHQL_URL and REST_API_BASE_URL in action build ([ab9790b](https://github.com/HallexCosta/clickpix-react/commit/ab9790bc386bee26b5cbb5a0d0581d396ed266b7))
* adjust error message to inform need a appid ([7b08136](https://github.com/HallexCosta/clickpix-react/commit/7b0813617ea1d03d06f48655d27cb4b9331baca3))

# [2.0.0](https://github.com/HallexCosta/clickpix-react/compare/v1.0.0...v2.0.0) (2024-12-16)


### Bug Fixes

* add .dev folder to ignore rules and remove dist folder ([bceb2ec](https://github.com/HallexCosta/clickpix-react/commit/bceb2ec79bb6ef3b2b2149c2ccba2255293ac081))
* add position fixed to modal ([a29d22d](https://github.com/HallexCosta/clickpix-react/commit/a29d22dbf2d4ff667bd422d5ae988f7c5c23b12d))
* add prepend root ([9876e38](https://github.com/HallexCosta/clickpix-react/commit/9876e38eaeb764a4939b6ce7d9652cf124711270))
* add z-20 in modal charge detail with iframe ([99db4de](https://github.com/HallexCosta/clickpix-react/commit/99db4de8632ec1c0a499a868690bc12c39d1589a))
* adjust output for prod build and hot-update chunk files ([991ae99](https://github.com/HallexCosta/clickpix-react/commit/991ae99fb482ec56898c11dd6be58f7e1a8579ea))
* adjust words "openix" to "openpix" ([3552649](https://github.com/HallexCosta/clickpix-react/commit/3552649ed5b9c060ca5a8266e918e862a54105f1))
* delete build folder ([8b410d2](https://github.com/HallexCosta/clickpix-react/commit/8b410d23f61cbdadc8a5a882be6f463c689f36b2))
* remove all dist folder references from gitignore rules files ([9dda967](https://github.com/HallexCosta/clickpix-react/commit/9dda967a262c7ecff77de886eec665532bbba1b2))
* **rspack:** import node:path module ([ab51329](https://github.com/HallexCosta/clickpix-react/commit/ab51329b8cb0e38679bbe88a6ddfec2b80d1254b))


### Features

* add .env.example structure of variables ([b7d0e6b](https://github.com/HallexCosta/clickpix-react/commit/b7d0e6b419abbe1ce6d4cfa90d264237bf549133))
* add appid property in checkout order type ([9a77786](https://github.com/HallexCosta/clickpix-react/commit/9a7778694c458ab3a2c8290c9e2e99fca479301e))
* add attribute [data-appid] ([8554a59](https://github.com/HallexCosta/clickpix-react/commit/8554a59e33732950a6baba962dad7c0089c9c237))
* add beta branch as prerelease ([92a0d05](https://github.com/HallexCosta/clickpix-react/commit/92a0d0589b841dffaf61100f2f66ffabeac0dd70))
* add CopyQRCodeButton ([e78b823](https://github.com/HallexCosta/clickpix-react/commit/e78b823c24cbc278c6d632297d2be9361bb3d266))
* add crossorigin to openpix.js tag script ([5aba721](https://github.com/HallexCosta/clickpix-react/commit/5aba721d4a73aae412d6e5ad502a5e90d70408d8))
* add div#root in body if not exists ([486bb7c](https://github.com/HallexCosta/clickpix-react/commit/486bb7c0514c703b74a34ba2d32597c338806158))
* add fixed position to iframe charge detail modal ([b1d5a64](https://github.com/HallexCosta/clickpix-react/commit/b1d5a64ec529a2d23ae3b27ba4d693c0f2ea64a8))
* add index.css and import in index.tsx ([39bbd47](https://github.com/HallexCosta/clickpix-react/commit/39bbd47469665d95c75a15384d14bd19aa7a391f))
* add load in module rules in rspack to compile in output bundle ([2c6cb18](https://github.com/HallexCosta/clickpix-react/commit/2c6cb1886b5df7a260b737f179edddea9d75530e))
* add loaders to load css in js ([18c270e](https://github.com/HallexCosta/clickpix-react/commit/18c270e0e5e5629aa00cd0dc2c5a215e4a773aa4))
* add new icons CircleOk and OK ([82ab1cf](https://github.com/HallexCosta/clickpix-react/commit/82ab1cf2ed8826feaf5e1b77b16b91439a271469))
* add param appid ([4549109](https://github.com/HallexCosta/clickpix-react/commit/45491093b3a7883666c950f6993121a0a763a459))
* add PixChargeEnvironmentBanner ([d1cbba2](https://github.com/HallexCosta/clickpix-react/commit/d1cbba20e6ced5fb43054003d440f7900b810ff8))
* add runner to remove .gitignore when commit dist release ([628c255](https://github.com/HallexCosta/clickpix-react/commit/628c255728e7f064b37cf9b88613e77515163dbf))
* add tailwindcss and postcss configs ([47279e9](https://github.com/HallexCosta/clickpix-react/commit/47279e9ce56c94d5e481f1bf0997398704e65e26))
* change prerelease from beta branch of false to true ([c518bba](https://github.com/HallexCosta/clickpix-react/commit/c518bbad7dd3e5881127042e8d9ecffbd1a86864))
* **charge:** add additionalInfoMapper and hideCNPJMask ([2371aa9](https://github.com/HallexCosta/clickpix-react/commit/2371aa9dae4c872dd003ddc42285b8abeb2a2a5f))
* **checkout/components:** add dropdownDDI and svg OpenPixLogo ([51f6192](https://github.com/HallexCosta/clickpix-react/commit/51f6192855c4f696fd2f3736bd4cb95abdf2be76))
* **checkout/context:** add property as required ([00a002c](https://github.com/HallexCosta/clickpix-react/commit/00a002c62a7f89d021725a5c5173a19bd9c6c5dd))
* **checkout/masks:** add masks for inputs ([cee9df7](https://github.com/HallexCosta/clickpix-react/commit/cee9df76a8f42a3d563172de6df09176ed4bc1df))
* **checkout/validation:** add validation functions ([1132685](https://github.com/HallexCosta/clickpix-react/commit/11326858a01d39325aabc241d72246a1029e1de5))
* **checkout:** adjust when show checkout, pending, paid or expired modal ([161e2ca](https://github.com/HallexCosta/clickpix-react/commit/161e2cae8cb3f59dec9f49c0d55333b14d5ec4e8))
* **common:** add combineHandlers ([bfc2cdc](https://github.com/HallexCosta/clickpix-react/commit/bfc2cdcfea48240a6a74163916f501d39f867d47))
* **common:** add cx tailwind merge function ([1d23f76](https://github.com/HallexCosta/clickpix-react/commit/1d23f76d803b664722ba19523c67232486d06b66))
* **common:** add generateCorrelationUniqueId ([95125a2](https://github.com/HallexCosta/clickpix-react/commit/95125a20d34e9c6cbdb7ec45e2399644f6277dc8))
* **common:** add generic type to createPromiseWithResolvers ([7d6229c](https://github.com/HallexCosta/clickpix-react/commit/7d6229c98dfcbce7093b87d6fcc22295b2d3a5ea))
* **common:** add type to params generateCorrelationUniqueId ([a48c55c](https://github.com/HallexCosta/clickpix-react/commit/a48c55ccfb9f5655adb11123e05c41735d51bc79))
* **common:** add unMaskValue handlers ([283cb86](https://github.com/HallexCosta/clickpix-react/commit/283cb8610132fe4fbbb97894c446788a4ab3fe6b))
* define eol as lf ([58eae3d](https://github.com/HallexCosta/clickpix-react/commit/58eae3d8754d9dcd2f08d41992ec11bbfe8ebd42))
* **deps:** add libs to assistant create forms ([c8462cc](https://github.com/HallexCosta/clickpix-react/commit/c8462cc245398ae7ca36d383acb29f00fc664a13))
* desaclople App from index ([b2aa7eb](https://github.com/HallexCosta/clickpix-react/commit/b2aa7ebffb05baa5c35ffccea6af3559c8835eaf))
* **index:** use path alias "@" ([68a56b4](https://github.com/HallexCosta/clickpix-react/commit/68a56b48eb6eba4b3755c8efdc5d3d2556d0ed32))
* **modules/charge:** add checkIsExpiredCharge ([4d12309](https://github.com/HallexCosta/clickpix-react/commit/4d12309041d6eb10872a2382d67067c8364426b2))
* **modules/charge:** add new ExpiredPixChargeReceipt modal ([feb6ae7](https://github.com/HallexCosta/clickpix-react/commit/feb6ae767f0b00facc7c307c6b8d956ad1f8f9c5))
* **modules/charge:** add new fetchSyncChargeUpdate ([468eadf](https://github.com/HallexCosta/clickpix-react/commit/468eadf2771fe57464710517c4a328922382d77b))
* **modules/charge:** add new PaidPixChargeReceipt component ([a9e58aa](https://github.com/HallexCosta/clickpix-react/commit/a9e58aa8c82458cef1764b25df372c02f7fbd02f))
* **modules/charge:** add new PendingPixCharge component ([53726d0](https://github.com/HallexCosta/clickpix-react/commit/53726d0d559ef1b84b2c6379c290c82c17df6ee7))
* **modules/checkout:** add new props for order type ([33c5b3a](https://github.com/HallexCosta/clickpix-react/commit/33c5b3a1509ee0fb4b3484ca4742d9f53ff79548))
* **modules/clickpix:** add new enums SET_CURRENT_MODAL and SET_SELECTED_PRODUCT_ID ([d9f28f6](https://github.com/HallexCosta/clickpix-react/commit/d9f28f6ad78353eeefbc7ed18f98bab31fd67331))
* **modules/clickpix:** add RenderClickPixButtons wrapper ([0ba621e](https://github.com/HallexCosta/clickpix-react/commit/0ba621e6bfa6808bfd4adcd9b9c6bad827c84f4d))
* **package:** add new dependencies ([4680972](https://github.com/HallexCosta/clickpix-react/commit/4680972de43dac953190ab385efc39315f79493d))
* pass current appid from order memory to openpix api and fetchSyncPaymentLink ([b93f9d1](https://github.com/HallexCosta/clickpix-react/commit/b93f9d1dde5967725dc55cb533358bb61e2f7760))
* **providers/woovi:** add createPixChargeRequest ([79f67d4](https://github.com/HallexCosta/clickpix-react/commit/79f67d43347d250e2b74b5b8bb0ce359e3783556))
* **providers/woovi:** add woovi providers interface to make request ([c8db6a9](https://github.com/HallexCosta/clickpix-react/commit/c8db6a9e9b07cf7ac86147dbe1105d27068b4d6e))
* **release:** add semantic-release/changelog plugin ([6033482](https://github.com/HallexCosta/clickpix-react/commit/60334829501c6eb44a35314f8234d2e90a27469a))
* remove $openpix config when initialize OpenpixSDK ([1b96923](https://github.com/HallexCosta/clickpix-react/commit/1b969232277ffeb18a4472c4de50debdda9255e6))
* **rspack:** resolve tsconfig ([8744572](https://github.com/HallexCosta/clickpix-react/commit/874457248ebb9686a308f34283c190126e37fe42))
* **tailwind:** add woovi color ([daeb44c](https://github.com/HallexCosta/clickpix-react/commit/daeb44ce2437be7cfce92164e71067d787345a41))
* **tsconfig:** configure paths alias ([a1fcd4a](https://github.com/HallexCosta/clickpix-react/commit/a1fcd4a52554bfec2f08cbb83b78fcf3357e2e1c))
* use env variables ([09585f7](https://github.com/HallexCosta/clickpix-react/commit/09585f7dd0a197dc6901fa541d7650095b338f94))
* validate if appid is defined ([da2818f](https://github.com/HallexCosta/clickpix-react/commit/da2818fe7aafb773c9d9f6f5413e0bc41016772c))


### BREAKING CHANGES

* now all users should be define the attribute [data-appid] to the application read and store in order memory
* now if div#root was not found, will be create a new div
in top on body
* replace tailwindcss cdn to css-in-js using postcss,
tailwindcss and autoprefixer
* Now the cdn should be target the dist folder instead of
build, and the build folder target .dev and hot-update chunk files
target to .dev/hot-modules to follow an semantic

# [2.0.0-beta.6](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2024-12-16)


### Features

* add CopyQRCodeButton ([e78b823](https://github.com/HallexCosta/clickpix-react/commit/e78b823c24cbc278c6d632297d2be9361bb3d266))
* add new icons CircleOk and OK ([82ab1cf](https://github.com/HallexCosta/clickpix-react/commit/82ab1cf2ed8826feaf5e1b77b16b91439a271469))
* add PixChargeEnvironmentBanner ([d1cbba2](https://github.com/HallexCosta/clickpix-react/commit/d1cbba20e6ced5fb43054003d440f7900b810ff8))
* **charge:** add additionalInfoMapper and hideCNPJMask ([2371aa9](https://github.com/HallexCosta/clickpix-react/commit/2371aa9dae4c872dd003ddc42285b8abeb2a2a5f))
* **checkout:** adjust when show checkout, pending, paid or expired modal ([161e2ca](https://github.com/HallexCosta/clickpix-react/commit/161e2cae8cb3f59dec9f49c0d55333b14d5ec4e8))
* **common:** add generateCorrelationUniqueId ([95125a2](https://github.com/HallexCosta/clickpix-react/commit/95125a20d34e9c6cbdb7ec45e2399644f6277dc8))
* **common:** add generic type to createPromiseWithResolvers ([7d6229c](https://github.com/HallexCosta/clickpix-react/commit/7d6229c98dfcbce7093b87d6fcc22295b2d3a5ea))
* desaclople App from index ([b2aa7eb](https://github.com/HallexCosta/clickpix-react/commit/b2aa7ebffb05baa5c35ffccea6af3559c8835eaf))
* **modules/charge:** add checkIsExpiredCharge ([4d12309](https://github.com/HallexCosta/clickpix-react/commit/4d12309041d6eb10872a2382d67067c8364426b2))
* **modules/charge:** add new ExpiredPixChargeReceipt modal ([feb6ae7](https://github.com/HallexCosta/clickpix-react/commit/feb6ae767f0b00facc7c307c6b8d956ad1f8f9c5))
* **modules/charge:** add new fetchSyncChargeUpdate ([468eadf](https://github.com/HallexCosta/clickpix-react/commit/468eadf2771fe57464710517c4a328922382d77b))
* **modules/charge:** add new PaidPixChargeReceipt component ([a9e58aa](https://github.com/HallexCosta/clickpix-react/commit/a9e58aa8c82458cef1764b25df372c02f7fbd02f))
* **modules/charge:** add new PendingPixCharge component ([53726d0](https://github.com/HallexCosta/clickpix-react/commit/53726d0d559ef1b84b2c6379c290c82c17df6ee7))
* **modules/checkout:** add new props for order type ([33c5b3a](https://github.com/HallexCosta/clickpix-react/commit/33c5b3a1509ee0fb4b3484ca4742d9f53ff79548))
* **modules/clickpix:** add new enums SET_CURRENT_MODAL and SET_SELECTED_PRODUCT_ID ([d9f28f6](https://github.com/HallexCosta/clickpix-react/commit/d9f28f6ad78353eeefbc7ed18f98bab31fd67331))
* **modules/clickpix:** add RenderClickPixButtons wrapper ([0ba621e](https://github.com/HallexCosta/clickpix-react/commit/0ba621e6bfa6808bfd4adcd9b9c6bad827c84f4d))
* **package:** add new dependencies ([4680972](https://github.com/HallexCosta/clickpix-react/commit/4680972de43dac953190ab385efc39315f79493d))
* **providers/woovi:** add createPixChargeRequest ([79f67d4](https://github.com/HallexCosta/clickpix-react/commit/79f67d43347d250e2b74b5b8bb0ce359e3783556))
* **release:** add semantic-release/changelog plugin ([6033482](https://github.com/HallexCosta/clickpix-react/commit/60334829501c6eb44a35314f8234d2e90a27469a))
* **tailwind:** add woovi color ([daeb44c](https://github.com/HallexCosta/clickpix-react/commit/daeb44ce2437be7cfce92164e71067d787345a41))

# [2.0.0-beta.5](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2024-12-13)


### Bug Fixes

* add position fixed to modal ([a29d22d](https://github.com/HallexCosta/clickpix-react/commit/a29d22dbf2d4ff667bd422d5ae988f7c5c23b12d))
* add z-20 in modal charge detail with iframe ([99db4de](https://github.com/HallexCosta/clickpix-react/commit/99db4de8632ec1c0a499a868690bc12c39d1589a))
* **rspack:** import node:path module ([ab51329](https://github.com/HallexCosta/clickpix-react/commit/ab51329b8cb0e38679bbe88a6ddfec2b80d1254b))


### Features

* add .env.example structure of variables ([b7d0e6b](https://github.com/HallexCosta/clickpix-react/commit/b7d0e6b419abbe1ce6d4cfa90d264237bf549133))
* add appid property in checkout order type ([9a77786](https://github.com/HallexCosta/clickpix-react/commit/9a7778694c458ab3a2c8290c9e2e99fca479301e))
* add attribute [data-appid] ([8554a59](https://github.com/HallexCosta/clickpix-react/commit/8554a59e33732950a6baba962dad7c0089c9c237))
* add fixed position to iframe charge detail modal ([b1d5a64](https://github.com/HallexCosta/clickpix-react/commit/b1d5a64ec529a2d23ae3b27ba4d693c0f2ea64a8))
* add param appid ([4549109](https://github.com/HallexCosta/clickpix-react/commit/45491093b3a7883666c950f6993121a0a763a459))
* **checkout/components:** add dropdownDDI and svg OpenPixLogo ([51f6192](https://github.com/HallexCosta/clickpix-react/commit/51f6192855c4f696fd2f3736bd4cb95abdf2be76))
* **checkout/context:** add property as required ([00a002c](https://github.com/HallexCosta/clickpix-react/commit/00a002c62a7f89d021725a5c5173a19bd9c6c5dd))
* **checkout/masks:** add masks for inputs ([cee9df7](https://github.com/HallexCosta/clickpix-react/commit/cee9df76a8f42a3d563172de6df09176ed4bc1df))
* **checkout/validation:** add validation functions ([1132685](https://github.com/HallexCosta/clickpix-react/commit/11326858a01d39325aabc241d72246a1029e1de5))
* **common:** add combineHandlers ([bfc2cdc](https://github.com/HallexCosta/clickpix-react/commit/bfc2cdcfea48240a6a74163916f501d39f867d47))
* **common:** add cx tailwind merge function ([1d23f76](https://github.com/HallexCosta/clickpix-react/commit/1d23f76d803b664722ba19523c67232486d06b66))
* **common:** add type to params generateCorrelationUniqueId ([a48c55c](https://github.com/HallexCosta/clickpix-react/commit/a48c55ccfb9f5655adb11123e05c41735d51bc79))
* **common:** add unMaskValue handlers ([283cb86](https://github.com/HallexCosta/clickpix-react/commit/283cb8610132fe4fbbb97894c446788a4ab3fe6b))
* define eol as lf ([58eae3d](https://github.com/HallexCosta/clickpix-react/commit/58eae3d8754d9dcd2f08d41992ec11bbfe8ebd42))
* **deps:** add libs to assistant create forms ([c8462cc](https://github.com/HallexCosta/clickpix-react/commit/c8462cc245398ae7ca36d383acb29f00fc664a13))
* **index:** use path alias "@" ([68a56b4](https://github.com/HallexCosta/clickpix-react/commit/68a56b48eb6eba4b3755c8efdc5d3d2556d0ed32))
* pass current appid from order memory to openpix api and fetchSyncPaymentLink ([b93f9d1](https://github.com/HallexCosta/clickpix-react/commit/b93f9d1dde5967725dc55cb533358bb61e2f7760))
* **providers/woovi:** add woovi providers interface to make request ([c8db6a9](https://github.com/HallexCosta/clickpix-react/commit/c8db6a9e9b07cf7ac86147dbe1105d27068b4d6e))
* remove $openpix config when initialize OpenpixSDK ([1b96923](https://github.com/HallexCosta/clickpix-react/commit/1b969232277ffeb18a4472c4de50debdda9255e6))
* **rspack:** resolve tsconfig ([8744572](https://github.com/HallexCosta/clickpix-react/commit/874457248ebb9686a308f34283c190126e37fe42))
* **tsconfig:** configure paths alias ([a1fcd4a](https://github.com/HallexCosta/clickpix-react/commit/a1fcd4a52554bfec2f08cbb83b78fcf3357e2e1c))
* use env variables ([09585f7](https://github.com/HallexCosta/clickpix-react/commit/09585f7dd0a197dc6901fa541d7650095b338f94))
* validate if appid is defined ([da2818f](https://github.com/HallexCosta/clickpix-react/commit/da2818fe7aafb773c9d9f6f5413e0bc41016772c))


### BREAKING CHANGES

* now all users should be define the attribute [data-appid] to the application read and store in order memory

### Refs
Close PR #1 
Close PR #2 

# [2.0.0-beta.4](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2024-12-10)


### Bug Fixes

* add prepend root ([9876e38](https://github.com/HallexCosta/clickpix-react/commit/9876e38eaeb764a4939b6ce7d9652cf124711270))


### BREAKING CHANGES

* now if div#root was not found, will be create a new div
in top on body

# [2.0.0-beta.3](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2024-12-10)


### Features

* add div#root in body if not exists ([486bb7c](https://github.com/HallexCosta/clickpix-react/commit/486bb7c0514c703b74a34ba2d32597c338806158))

# [2.0.0-beta.2](https://github.com/HallexCosta/clickpix-react/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2024-12-10)


### Features

* add index.css and import in index.tsx ([39bbd47](https://github.com/HallexCosta/clickpix-react/commit/39bbd47469665d95c75a15384d14bd19aa7a391f))
* add load in module rules in rspack to compile in output bundle ([2c6cb18](https://github.com/HallexCosta/clickpix-react/commit/2c6cb1886b5df7a260b737f179edddea9d75530e))
* add loaders to load css in js ([18c270e](https://github.com/HallexCosta/clickpix-react/commit/18c270e0e5e5629aa00cd0dc2c5a215e4a773aa4))
* add runner to remove .gitignore when commit dist release ([628c255](https://github.com/HallexCosta/clickpix-react/commit/628c255728e7f064b37cf9b88613e77515163dbf))
* add tailwindcss and postcss configs ([47279e9](https://github.com/HallexCosta/clickpix-react/commit/47279e9ce56c94d5e481f1bf0997398704e65e26))


### BREAKING CHANGES

* replace tailwindcss cdn to css-in-js using postcss,
tailwindcss and autoprefixer

# [2.0.0-beta.1](https://github.com/HallexCosta/clickpix-react/compare/v1.0.0...v2.0.0-beta.1) (2024-12-10)


### Bug Fixes

* add .dev folder to ignore rules and remove dist folder ([bceb2ec](https://github.com/HallexCosta/clickpix-react/commit/bceb2ec79bb6ef3b2b2149c2ccba2255293ac081))
* adjust output for prod build and hot-update chunk files ([991ae99](https://github.com/HallexCosta/clickpix-react/commit/991ae99fb482ec56898c11dd6be58f7e1a8579ea))
* adjust words "openix" to "openpix" ([3552649](https://github.com/HallexCosta/clickpix-react/commit/3552649ed5b9c060ca5a8266e918e862a54105f1))
* delete build folder ([8b410d2](https://github.com/HallexCosta/clickpix-react/commit/8b410d23f61cbdadc8a5a882be6f463c689f36b2))
* remove all dist folder references from gitignore rules files ([9dda967](https://github.com/HallexCosta/clickpix-react/commit/9dda967a262c7ecff77de886eec665532bbba1b2))


### Features

* add beta branch as prerelease ([92a0d05](https://github.com/HallexCosta/clickpix-react/commit/92a0d0589b841dffaf61100f2f66ffabeac0dd70))
* add crossorigin to openpix.js tag script ([5aba721](https://github.com/HallexCosta/clickpix-react/commit/5aba721d4a73aae412d6e5ad502a5e90d70408d8))
* change prerelease from beta branch of false to true ([c518bba](https://github.com/HallexCosta/clickpix-react/commit/c518bbad7dd3e5881127042e8d9ecffbd1a86864))


### BREAKING CHANGES

* Now the cdn should be target the dist folder instead of
build, and the build folder target .dev and hot-update chunk files
target to .dev/hot-modules to follow an semantic

# Changelog 1.0.0 (2024-12-10)

### Features

* add project ([9ad094e](https://github.com/HallexCosta/clickpix-react/commit/9ad094e4675534c62c5735ac801e796bbede203b))

### Feature Infos
- add clickpix button when find div tag with class `clickpix`
  - require attributes ` [data-product-id], [data-additional-info]` and `[data-value]`
  - add beta attributes `[data-variant]`, `[data-customer-fields]`
- add a checkout modal to catch the customer data for create charge 

### Bugs Fixes
> No changes

### Documentation
  - need tailwindcss cdn to work fine with checkout modal
  - need `openpix.js` plugin from woovi to work fine - [plugin](https://developers.woovi.com/en/docs/plugin)
 
You make follow the example create in this directory [examples/0.1.0/index.html](./examples/0.1.0/index.html)

**Full Changelog**: https://github.com/HallexCosta/clickpix-react/commits/0.1.0
