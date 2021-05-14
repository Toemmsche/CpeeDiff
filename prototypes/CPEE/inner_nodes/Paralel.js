/*
    Copyright 2021 Tom Papke

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http=//www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const {CPEENode} = require("../CPEENode");
const {DSL} = require("../DSL");

class Parallel extends CPEENode {

    constructor() {
        super(DSL.PARALLEL);
    }

    compareTo(other) {
        if (this.label !== other.label) {
            return 1;
        }
        let compareValue = 0;
        //wait attribute dictates the number of branches that have to finish until execution proceeds
        if (this.attributes.has("wait") && this.attributes.get("wait") !== other.attributes.get("wait")) {
            compareValue += 0.2;
        }
        return compareValue;
    }
}

exports.Parallel = Parallel;