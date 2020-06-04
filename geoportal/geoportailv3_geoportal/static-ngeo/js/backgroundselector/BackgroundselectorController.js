/**
 * @module app.backgroundlayer.BackgroundselectorController
 */

import appModule from '../module.js';
import {listen} from 'ol/events.js';

/**
 * @param {ngeo.map.BackgroundLayerMgr} ngeoBackgroundLayerMgr Background layer manager.
 * @param {import('../Themes').default} appThemes The app themes.
 * @ngInject
 */
class Controller {
    constructor(ngeoBackgroundLayerMgr, appThemes) {
        /**
         * @type {ngeo.map.BackgroundLayerMgr}
         * @private
         */
        this.backgroundLayerMgr_ = ngeoBackgroundLayerMgr;

        /**
         * @type {import('../Themes').default}
         */
        this.appThemes_ = appThemes;

        /**
         * @type {import('ol/layer/Base').default[]}
         */
        this.bgLayers;

        /**
         * @type {import('ol/layer/Base').default}
         */
        this.bgLayer;

        /**
         * @type {boolean}
         */
        this.isOpened = false;
    }

    $onInit() {
        this.appThemes_.getBgLayers(this.map).then(bgLayers => {
            this.bgLayers = bgLayers;
            this.bgLayer = this.backgroundLayerMgr_.get(this.map);
        });
    
        listen(this.backgroundLayerMgr_, 'change', evt => {
            /**
             * @type {BaseLayer}
             */
            const previous = evt.detail.previous;

            /**
             * @type {BaseLayer}
             */
            const current = evt.detail.current;

            if (previous) {
                previous.setVisible(false);
            }
            current.setVisible(true);
            this.bgLayer = current;

        });
      };

    /**
     * @param {BaseLayer} layer Layer.
     * @export
     */
    setBackgroundLayer(layer) {
        this.bgLayer = layer;
        this.backgroundLayerMgr_.set(this.map, layer);
    };

    /**
     * @export
     */
    toggleSelector() {
        this.isOpened = !this.isOpened;
    };
};

appModule.controller('AppBackgroundselectorController', Controller);
export default Controller;
