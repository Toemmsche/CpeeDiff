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

const {Dsl} = require("../Dsl");

class CpeeNode {

    //cpee information
    /**
     * @type String
     */
    label;
    /**
     * @type Map<String,String>
     */
    attributes;
    /**
     * @type String
     */
    data;


    constructor(label, data = null) {
        this.label = label;
        this.data = data;
        this.attributes = new Map();

        this._childNodes = [];
        this._parent = null;
        this._childIndex = null;
    }

    //structural information
    /**
     * @type CpeeNode
     * @private
     */
    _parent;

    /**
     * @returns {CpeeNode}
     */
    get parent() {
        return this._parent;
    }

    /**
     * @type Number
     * @private
     */
    _childIndex;

    /**
     * @returns {Number}
     */
    get childIndex() {
        return this._childIndex;
    }

    /**
     * @type CpeeNode[]
     * @private
     */
    _childNodes;

    /**
     * @returns {CpeeNode[]}
     */
    get childNodes() {
        return this._childNodes;
    }

    /**
     *
     * @param {CpeeNode[]} newChildNodes
     */
    set childNodes(childNodes) {
        this._childNodes = childNodes;
    }

    /**
     * @returns {CpeeNode[]}
     */
    get path() {
        const pathArr = [];
        let node = this;
        while (node != null) {
            if (pathArr.includes(node)) {
                console.log("up")
            }
            pathArr.push(node);
            node = node._parent;
        }
        return pathArr.reverse().slice(1);
    }

    /**
     * @returns {IterableIterator<CpeeNode>}
     */
    [Symbol.iterator]() {
        return this._childNodes[Symbol.iterator]();
    }

    /**
     *
     * @returns {number}
     */
    numChildren() {
        return this._childNodes.length;
    }

    /**
     *
     * @param index
     * @returns {CpeeNode}
     */
    getChild(index) {
        return this._childNodes[index];
    }

    /**
     *
     * @returns {CpeeNode[]}
     */
    getSiblings() {
        return this._parent._childNodes;
    }

    /**
     *
     * @param {CpeeNode} other
     */
    contentEquals(other) {
        if (this.label !== other.label) return false;
        if (this.attributes.size !== other.attributes.size) return false;
        for (const [key, value] of this.attributes) {
            if (other.attributes.get(key) !== value) return false;
        }
        if (this.data !== other.data) return false;
        return true;
    }

    deepEquals(other) {
        if (!this.contentEquals(other)) return false;
        if(this.numChildren() !== other.numChildren()) return false;
        for (let i = 0; i < this.numChildren(); i++) {
            if(!this.getChild(i).deepEquals(other.getChild(i))) return false;
        }
        return true;
    }

    /**
     * @returns {boolean}
     */
    hasChildren() {
        return this.numChildren() > 0;
    }

    /**
     *
     * @returns {boolean}
     */
    hasAttributes() {
        return this.attributes.size > 0
    }

    /**
     *
     * @returns {boolean}
     */
    hasInternalOrdering() {
        return Dsl.INTERNAL_ORDERING_SET.has(this.label);
    }

    /**
     *
     * @returns {boolean}
     */
    isLeaf() {
        return Dsl.LEAF_NODE_SET.has(this.label);
    }

    isInnerNode() {
        return Dsl.INNER_NODE_SET.has(this.label);
    }

    /**
     *
     * @returns {boolean}
     */
    isPropertyNode() {
        return !Dsl.KEYWORD_SET.has(this.label);
    }

    isRoot() {
        return this.label === Dsl.KEYWORDS.ROOT.label && this._parent == null;
    }

    /**
     *
     * @returns {boolean}
     */
    isEmpty() {
        return !this.isLeaf()
            && (this.data === "" || this.data == null)
            && !this.hasAttributes()
            && !this.hasChildren();
    }

    /**
     *
     * @returns {boolean}
     */
    containsCode() {
        return this.label === "manipulate"
            || this._childNodes.some(n => n.label === "code");
    }

    /**
     *  @returns {boolean}
     */
    containsCondition() {
        return this.attributes.has("condition");
    }

    /**
     *
     * @param {CpeeNode} node
     */
    appendChild(node) {
        node._childIndex = this._childNodes.push(node) - 1;
        node._parent = this;
        //fixChildIndices can be omitted as no other children are affected
    }

    /**
     *
     * @param {Number} index
     * @param {CpeeNode} node
     */
    insertChild(index, node) {
        this._childNodes.splice(index, 0, node);
        node._parent = this;
        this._fixChildIndices();
    }

    /**
     *
     * @param {Number} newIndex
     */
    changeChildIndex(newIndex) {
        if(newIndex > this._childIndex) {
            newIndex--;
        }
        //delete
        this._parent._childNodes.splice(this._childIndex, 1);
        //insert
        this._parent._childNodes.splice(newIndex, 0, this);
        //adjust child indices
        this._parent._fixChildIndices();
    }

    removeFromParent() {
        if (this._parent != null) {
            this._parent.childNodes.splice(this._childIndex, 1);
            this._parent._fixChildIndices();
        } else {
            console.log("Cannot remove node that has no parent");
        }

    }

    _fixChildIndices() {
        for (let i = 0; i < this._childNodes.length; i++) {
            this._childNodes[i]._childIndex = i;
        }
    }

    toChildIndexPathString() {
        //discard root node
        return this.path.map(n => n.childIndex).join("/");
    }

    toString() {
        return this.label;
    }

    /**
     *
     * @param {CpeeNode[]} arr
     * @returns {CpeeNode[]}
     */
    toPreOrderArray(arr = []) {
        arr.push(this);
        for (const child of this) {
            child.toPreOrderArray(arr);
        }
        return arr;
    }

    /**
     *
     * @param {CpeeNode[]} arr
     * @returns {CpeeNode[]}
     */
    toPostOrderArray(arr = []) {
        for (const child of this) {
            child.toPostOrderArray(arr);
        }
        arr.push(this);
        return arr;
    }

}

exports.CpeeNode = CpeeNode;