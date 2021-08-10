/*
    Copyright 2021 Tom Papke

   Licensed under the Apache License, Version 2.0 (the "License"),
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

export const TestConfig = {

    RUN_AUTOGENERATED_TESTS: true,

    GEN : {
        EXP_LIMIT: 8,
        FACTOR: 10,
        INITIAL_SIZE: 100,
        REPS: 10,

        INITIAL_CHANGES: 10
    },

    //TODO option to store genearted models in test case folder
    // option to turn off generation use old models

    //TODO filename objec t

    GEN_PARAMS_FILENAME: "genParams.json",
    CHANGE_PARAMS_FILENAME: "changeParams.json",
    RUN_SCRIPT_FILENAME: "run.sh",

    OLD_TREE_FILENAME: "old.xml",
    NEW_TREE_FILENAME: "new.xml",

    DIFF_EXPECTED_FILENAME: "info.json",

    EXPECTED_MATCHES_FILE_NAME: "expected.json",

    BASE_FILE_NAME: "base.xml",
    BRANCH_1_FILE_NAME: "1.xml",
    BRANCH_2_FILE_NAME: "2.xml",
    EXPECTED_MERGE_PREFIX: "expected",
    ACCEPTED_MERGE_PREFIX: "accepted",

    MATCH_CASES_DIR: "test/test_set/match_cases",
    DIFF_CASES_DIR: "test/test_set/diff_cases",
    MERGE_CASES_DIR: "test/test_set/merge_cases",

    EXECUTION_OPTIONS: {
        timeout: 30000, //30s
        maxBuffer: 100 * 1024 * 1024 //100 MiB
    },
    VERDICTS: {
        OK: "OK",
        ACCEPTABLE: "ACCEPTABLE",
        WRONG_ANSWER: "WRONG ANSWER",
        RUNTIME_ERROR: "RUNTIME ERROR",
        FAILED: "FAILED",
        TIMEOUT: "TIMEOUT"
    },

    MATCHINGS: {
        CPEEMATCH: {
            displayName: "CpeeMatch",
            path: ""
        }
    },

    DIFFS: {
        CPEEDIFF: {
            displayName: "CpeeDiff",
            path: ""
        },
        XMLDIFF: {
            displayName: "XmlDiff",
            path: "../xml_diff_algos/xmldiff"
        },
        DIFFXML: {
            displayName: "DiffXml",
            path: "../xml_diff_algos/diffxml"
        },
        DELTAJS: {
            displayName: "Delta.js",
            path: "../xml_diff_algos/deltajs"
        },
        XCC: {
            displayName: "XCC Diff",
            path: "../xml_diff_algos/xcc"
        },
        UNIXDIFF: {
            displayName: "UNIX diff",
            path: "../xml_diff_algos/unixdiff"
        },
        XYDIFF: {
            displayName: "XyDiff",
            path: "../xml_diff_algos/xydiff"
        }
    },

    MERGES: {
        CPEEMERGE: {
            displayName: "CpeeMerge",
            path: ""
        },
        _3DM: {
            displayName: "3DM",
            path: "../xml_merge_algos/3dm"
        },
        XCC: {
            displayName: "XCC Diff & Patch",
            path: "../xml_merge_algos/xcc"
        }
    },

    //TODO criteria matching
    //     #tests passed (accuracy and overall quality)
    //      runtime
    //      edit script size
    //      #nodes matched
    //      merging #tests with expected result


}

