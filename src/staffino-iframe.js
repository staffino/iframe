/*
 * (C) Copyright 2015 Staffino, s.r.o. (https://staffino.com/) and others.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

(function ($) {

    var autoWidths = [],
        autoHeights = [],
        scrollOnPopups = [];

    $.fn.staffino = function (options) {

        var settings = $.extend({
            width: '100%',
            height: 'content',
            scrollOnPopup: true,
            baseUrl: 'https://staffino.com'
        }, options);

        if (!settings.venue) {
            throw new Error('Please specify venue ID');
        }

        var url = settings.baseUrl + '/' +
            (options.locale ? (options.locale + '/') : '') +
            settings.venue + '?customized=1' + location.hash;

        var iframeElements = [];

        this.each(function() {
            iframe = $('<iframe></iframe>').attr({ src: url, frameborder: 0, scrolling: 'no'}).get(0);
            iframeElements.push(iframe);
            $(this).append(iframe);
        });

        if (settings.width == 'content') {
            Array.prototype.push.apply(autoWidths, iframeElements);
        } else {
            $(iframeElements).map(function() {
                $(this).css('width', $.isNumeric(settings.width) ? (settings.width + 'px') : settings.width);
            });
        }
        if (settings.height == 'content') {
            Array.prototype.push.apply(autoHeights, iframeElements);
        } else {
            $(iframeElements).map(function() {
                $(this).css('width', $.isNumeric(settings.height) ? (settings.height + 'px') : settings.height);
            });
        }
        if (settings.scrollOnPopup) {
            Array.prototype.push.apply(scrollOnPopups, iframeElements);
        }
    };

    $(window).on('message', function(event) {
        var e = event.originalEvent,
            data = e.data;

        if (data && data.staffino) {
            switch (data.staffino.message) {
                case 'url':
                    e.source.postMessage({ staffino: { url: { response: location.href }}}, e.origin);
                    break;
                case 'resize':
                    for (var i = 0; i < autoWidths.length; i++) {
                        if (autoWidths[i].contentWindow === e.source) {
                            $(autoWidths[i]).css('height', data.staffino.width + 'px');
                            break;
                        }
                    }
                    for (i = 0; i < autoHeights.length; i++) {
                        if (autoHeights[i].contentWindow === e.source) {
                            $(autoHeights[i]).css('height', data.staffino.height + 'px');
                            break;
                        }
                    }
                    break;
                case 'scroll-to-iframe':
                    for (i = 0; i < scrollOnPopups.length; i++) {
                        if (scrollOnPopups[i].contentWindow === e.source) {
                            $('html, body').animate({
                                scrollTop: $(scrollOnPopups[i]).offset().top
                            }, 500);
                            break;
                        }
                    }
                    break;
            }
        }
    });

}(jQuery));