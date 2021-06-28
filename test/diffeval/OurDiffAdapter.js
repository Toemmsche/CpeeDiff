/*
    Copyright 2021 Tom Papke

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

const assert = require("assert");
const fs = require("fs");
const {DeltaModelGenerator} = require("../../src/patch/DeltaModelGenerator");
const {XmlFactory} = require("../../src/factory/XmlFactory");
const {DiffTestResult} = require("./DiffTestResult");
const {Config} = require("../../src/Config");
const {Dsl} = require("../../src/Dsl");
const {MatchDiff} = require("../../src/diff/MatchDiff");

class OurDiffAdapter {

    evalCase(info, oldTree, newTree) {
        let time = new Date().getTime();
        let delta;
        try {
            delta = new MatchDiff().diff(oldTree, newTree);

        } catch(e) {
            console.log(e);
            //no test result available since diff algorithm crashed
            return null;
        }
        time = new Date().getTime() - time;

        Config.EXACT_EDIT_SCRIPT  =true;
        //verify the correctness of our diff by patching the original tree with it
        const deltaTree = new DeltaModelGenerator().deltaTree(oldTree, delta);
        const correctDiff = deltaTree.root.deepEquals(newTree.root);

        if(!correctDiff) {
            //signal failure
            return null;
        }

        let updateCounter = 0;
        let insertionCounter = 0;
        let moveCounter = 0;
        let deletionCounter = 0;
        for(const change of delta.changes) {
            switch(change.changeType) {
                case Dsl.CHANGE_TYPES.INSERTION:
                case Dsl.CHANGE_TYPES.SUBTREE_INSERTION:
                    insertionCounter++;
                    break;
                case Dsl.CHANGE_TYPES.DELETION:
                case Dsl.CHANGE_TYPES.SUBTREE_DELETION:
                    deletionCounter++;
                    break;
                case Dsl.CHANGE_TYPES.MOVE_TO:
                    moveCounter++;
                    break;
                case Dsl.CHANGE_TYPES.UPDATE:
                    updateCounter++;
                    break;
            }
        }
        const changesFound = updateCounter + deletionCounter + insertionCounter + moveCounter;
        const diffSize = XmlFactory.serialize(delta).length;
        return new DiffTestResult(info, "OurDiffAlgorithm", time, changesFound, insertionCounter, moveCounter, updateCounter,deletionCounter, diffSize )
    }

    static register(diffAdapters) {
        diffAdapters.push(new OurDiffAdapter());
    }
}

exports.OurDiffAdapter = OurDiffAdapter;