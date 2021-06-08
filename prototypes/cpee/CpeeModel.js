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

//TODO doc
const {DeltaNode} = require("./DeltaNode");
const {CpeeNode} = require("./CpeeNode");

class CpeeModel {

    /**
     * @type CpeeNode
     */
    root;
    /**
     *  @type Set<String>
     */
    declaredVariables;

    constructor(root, declaredVariables = new Set()) {
        this.root = root;
        this.declaredVariables = declaredVariables;
    }

    copy(includeChildNodes = true) {
        return new CpeeModel(this.root.copy(includeChildNodes));
    }

    deltaCopy(includeChildNodes = true) {
        return new CpeeModel(DeltaNode.parseFromJson(this.root.convertToJson(includeChildNodes)));
    }

    toPreOrderArray() {
        return this.root.toPreOrderArray();
    }

    toPostOrderArray() {
        return this.root.toPostOrderArray();
    }

    leafNodes() {
        return this.toPreOrderArray().filter(n => n.isControlFlowLeafNode());
    }
}

exports.CpeeModel = CpeeModel;