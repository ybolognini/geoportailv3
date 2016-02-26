/**
 * @fileoverview This file provides an Angular service for interacting
 * with the "geocoding" web service.
 */
goog.provide('app.Geocoding');

goog.require('app');
goog.require('ol.proj');



/**
 * @constructor
 * @param {angular.$http} $http The Angular $http service.
 * @param {string} reverseGeocodingServiceUrl
 * @ngInject
 */
app.Geocoding = function($http, reverseGeocodingServiceUrl) {
  /**
   * @type {angular.$http}
   * @private
   */
  this.$http_ = $http;

  /**
   * @type {string}
   * @private
   */
  this.reverseGeocodingServiceUrl_ = reverseGeocodingServiceUrl;
};


/**
 * @param {ol.Coordinate} coordinate
 * @return {!angular.$q.Promise} Promise providing the reverse geocode.
 */
app.Geocoding.prototype.reverseGeocode = function(coordinate) {
  var lonlat = /** @type {ol.Coordinate} */
      (ol.proj.transform(coordinate,
      'EPSG:3857', 'EPSG:2169'));

  return this.$http_.get(this.reverseGeocodingServiceUrl_, {
    params: {
      'easting': lonlat[0],
      'northing': lonlat[1]
    }
  }).then(
      /**
         * @param {angular.$http.Response} resp Ajax response.
         * @return {Object} The response
         */
          function(resp) {
            return resp['data'];
          });
};


app.module.service('appGeocoding', app.Geocoding);
