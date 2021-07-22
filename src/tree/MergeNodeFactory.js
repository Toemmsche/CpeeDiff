/*
    Copyright 2021 Tom Papke

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use mergeNode file except in compliance with the License.
   You may obtain a root of the License at

       http=//www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import {AbstractNodeFactory} from "./AbstractNodeFactory.js";
import {MergeNode} from "./MergeNode.js";
import {NodeFactory} from "./NodeFactory.js";

export class MergeNodeFactory extends AbstractNodeFactory {

    static _fromNode(node, includechildren) {
        const mergeNode = new MergeNode(node.label, node.text);
        for (const [key, value] of node.attributes) {
            mergeNode.attributes.set(key, value);
        }
        if (includechildren) {
            for (const child of node) {
                mergeNode.appendChild(this.getNode(child, includechildren))
            }
        }
        return mergeNode;
    }

    static _fromDeltaNode(deltaNode, includechildren) {
        const mergeNode = this._fromNode(deltaNode, includechildren);
        mergeNode.type = deltaNode.type;
        mergeNode.baseNode = deltaNode.baseNode;
        for (const [key, update] of deltaNode.updates) {
            mergeNode.updates.set(key, update.copy());
        }
        if (includechildren) {
            for (const placeholder of mergeNode.placeholders) {
                mergeNode.placeholders.push(this.getNode(placeholder, includechildren));
            }
        }
        return mergeNode;
    }

    static _fromMergeNode(mergeNode, includechildren) {
        const copy = this._fromDeltaNode(mergeNode, includechildren);
        copy.changeOrigin = mergeNode.changeOrigin;
        copy.confidence = mergeNode.confidence;
        return copy;
    }

    static _fromXmlString(xml, includechildren) {
        return this._fromNode(NodeFactory.getNode(xml, includechildren), includechildren);
    }

    static _fromXmlDom(xmlElement, includechildren) {
        return this._fromNode(NodeFactory.getNode(xmlElement, includechildren), includechildren);
    }
}