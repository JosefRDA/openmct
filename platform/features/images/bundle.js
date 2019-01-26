/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2018, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([
    "./src/ImageController",
    "text!./res/image.html",
    'legacyRegistry'
], function (
    ImageController,
    imageTemplate,
    legacyRegistry
) {

    legacyRegistry.register("platform/features/images", {
        "extensions": {
            "types": [
                {
                    "key": "example.image",
                    "name": "Image",
                    "cssClass": "icon-image",
                    "description": "Add an image",
                    "priority": 50,
                    "features": [
                        "creation"
                    ],
                    "properties": [
                        {
                            "key": "url",
                            "name": "URL",
                            "control": "textfield",
                            "required": true,
                            "cssClass": "l-input-lg"
                        },
                        {
                            "key": "size",
                            "name": "Image size",
                            "control": "select",
                            "required": true,
                            "options": [
                                {
                                    "name": "Original size",
                                    "value": "auto"
                                },
                                {
                                    "name": "Contain within area (maintain aspect ratio)",
                                    "value": "contain"
                                },
                                {
                                    "name": "Cover whole area (maintain aspect ratio)",
                                    "value": "cover"
                                },
                                {
                                    "name": "Fit to area",
                                    "value": "100% 100%"
                                },
                            ],
                            "cssClass": "l-inline"
                        },
                        {
                            "key": "position",
                            "name": "Image position",
                            "control": "select",
                            "required": true,
                            "options": [
                                {
                                    "name": "Top left",
                                    "value": "left top"
                                },
                                {
                                    "name": "Top center",
                                    "value": "center top"
                                },
                                {
                                    "name": "Top right",
                                    "value": "right top"
                                },
                                {
                                    "name": "Middle left",
                                    "value": "left center"
                                },
                                {
                                    "name": "Middle center",
                                    "value": "center center"
                                },
                                {
                                    "name": "Middle right",
                                    "value": "right center"
                                },
                                {
                                    "name": "Bottom left",
                                    "value": "left bottom"
                                },
                                {
                                    "name": "Bottom center",
                                    "value": "center bottom"
                                },
                                {
                                    "name": "Bottom right",
                                    "value": "right bottom"
                                },
                            ],
                            "cssClass": "l-inline"
                        },
                    ]
                }
            ],
            "views": [
                {
                    "template": imageTemplate,
                    "name": "Page",
                    "type": "example.image",
                    "key": "example.image",
                    "editable": false
                }
            ],
            "controllers": [
                {
                    "key": "ImageController",
                    "implementation": ImageController,
                    "depends": [
                        "$sce"
                    ]
                }
            ]
        }
    });
});
