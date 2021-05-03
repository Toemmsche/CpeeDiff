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
const {CPEEModel} = require("../CPEE/CPEEModel");
const {MatchDiff} = require("../MatchDiff");

let xml234 = "<description xmlns=\"http://cpee.org/ns/description/1.0\">\n" +
    "<call id=\"a1\" endpoint=\"\">\n" +
    "<parameters>\n" +
    "<label/>\n" +
    "<method>:post</method>\n" +
    "<arguments/>\n" +
    "<stream>\n" +
    "<sensors/>\n" +
    "<ips/>\n" +
    "</stream>\n" +
    "<report>\n" +
    "<url/>\n" +
    "</report>\n" +
    "</parameters>\n" +
    "<code>\n" +
    "<prepare/>\n" +
    "<finalize output=\"result\"/>\n" +
    "<update output=\"result\"/>\n" +
    "<rescue output=\"result\"/>\n" +
    "</code>\n" +
    "<annotations>\n" +
    "<_timing>\n" +
    "<_timing_weight/>\n" +
    "<_timing_avg/>\n" +
    "<explanations/>\n" +
    "</_timing>\n" +
    "<_notes>\n" +
    "<_notes_general/>\n" +
    "</_notes>\n" +
    "</annotations>\n" +
    "<input/>\n" +
    "<output/>\n" +
    "<implementation>\n" +
    "<description/>\n" +
    "</implementation>\n" +
    "<code>\n" +
    "<description/>\n" +
    "</code>\n" +
    "</call>\n" +
    "<call id=\"a2\" endpoint=\"\">\n" +
    "<parameters>\n" +
    "<label/>\n" +
    "<method>:post</method>\n" +
    "<arguments/>\n" +
    "<stream>\n" +
    "<sensors/>\n" +
    "<ips/>\n" +
    "</stream>\n" +
    "<report>\n" +
    "<url/>\n" +
    "</report>\n" +
    "</parameters>\n" +
    "<annotations>\n" +
    "<_timing>\n" +
    "<_timing_weight/>\n" +
    "<_timing_avg/>\n" +
    "<explanations/>\n" +
    "</_timing>\n" +
    "<_notes>\n" +
    "<_notes_general/>\n" +
    "</_notes>\n" +
    "</annotations>\n" +
    "<input/>\n" +
    "<output/>\n" +
    "<implementation>\n" +
    "<description/>\n" +
    "</implementation>\n" +
    "</call>\n" +
    "</description>";

let xml123 = "<description xmlns=\"http://cpee.org/ns/description/1.0\">\n" +
    "<call id=\"a3\" endpoint=\"DUMMY\">\n" +
    "<parameters>\n" +
    "<label>ADDEDTASK</label>\n" +
    "<method>:get</method>\n" +
    "<arguments/>\n" +
    "<report>\n" +
    "<url/>\n" +
    "</report>\n" +
    "<stream>\n" +
    "<sensors/>\n" +
    "<ips/>\n" +
    "</stream>\n" +
    "</parameters>\n" +
    "<annotations keke=\"asdlfsajfsldfjsdlfjsdflsdfjsdlf\">\n" +
    "<_timing>\n" +
    "<_timing_weight/>\n" +
    "<_timing_avg/>\n" +
    "<explanations/>\n" +
    "</_timing>\n" +
    "<_notes>\n" +
    "<_notes_general/>\n" +
    "</_notes>\n" +
    "</annotations>\n" +
    "<input/>\n" +
    "<output/>\n" +
    "<implementation>\n" +
    "<description/>\n" +
    "</implementation>\n" +
    "</call>\n" +
    "<call id=\"a1\" endpoint=\"\">\n" +
    "<code>\n" +
    "<prepare/>\n" +
    "<finalize output=\"result\"/>\n" +
    "<update output=\"result\"/>\n" +
    "<rescue output=\"result\"/>\n" +
    "</code>\n" +
    "<annotations>\n" +
    "<_timing>\n" +
    "<_timing_weight/>\n" +
    "<_timing_avg/>\n" +
    "<explanations/>\n" +
    "</_timing>\n" +
    "<_notes>\n" +
    "<_notes_general/>\n" +
    "</_notes>\n" +
    "</annotations>\n" +
    "<input/>\n" +
    "<output/>\n" +
    "<implementation>\n" +
    "<description/>\n" +
    "</implementation>\n" +
    "<code>\n" +
    "<description/>\n" +
    "</code>\n" +
    "</call>\n" +
    "<call id=\"a2\" endpoint=\"\">\n" +
    "<parameters>\n" +
    "<label/>\n" +
    "<method>:post</method>\n" +
    "<arguments/>\n" +
    "<stream>\n" +
    "<sensors/>\n" +
    "<ips/>\n" +
    "</stream>\n" +
    "<report>\n" +
    "<url/>\n" +
    "</report>\n" +
    "</parameters>\n" +
    "<annotations>\n" +
    "<_timing>\n" +
    "<_timing_weight/>\n" +
    "<_timing_avg/>\n" +
    "<explanations/>\n" +
    "</_timing>\n" +
    "<_notes>\n" +
    "<_notes_general/>\n" +
    "</_notes>\n" +
    "</annotations>\n" +
    "<input/>\n" +
    "<output/>\n" +
    "<implementation>\n" +
    "<description/>\n" +
    "</implementation>\n" +
    "</call>\n" +
    "</description>";

const xml1 = "<a><b><d></d><c></c></b><i></i></a>";
const xml2 = "<a><e><f><b><c></c></b><i></i></f></e><g></g></a>";

const model1 = CPEEModel.from(xml123);
const model2 = CPEEModel.from(xml234);
const sd = new MatchDiff(model1, model2);
sd.diff();
console.log(model);

