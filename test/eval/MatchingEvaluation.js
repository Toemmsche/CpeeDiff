import {EvalConfig} from '../../src/config/EvalConfig.js';
import {AggregateMatchResult} from '../result/AggregateMatchResult.js';
import {Logger} from '../../util/Logger.js';
import {DirectoryScraper} from '../case/DirectoryScraper.js';
import {MatchTestCase} from '../case/MatchTestCase.js';
import {markdownTable} from 'markdown-table';
import {AbstractEvaluation} from './AbstractEvaluation.js';
import {DiffConfig} from '../../src/config/DiffConfig.js';
import {CpeeDiffAdapter} from '../diff_adapters/CpeeDiffAdapter.js';

/**
 * An evaluation of matching algorithms using predefined test cases.
 */
export class MatchingEvaluation extends AbstractEvaluation {
  /**
   * Construct a new MatchingEvaluation instance.
   * @param {Array<MatchAdapter>} adapters The adapters of the matching
   *     algorithms to be evaluated.
   */
  constructor(adapters = []) {
    super(adapters);
  }

  /**
   * Create a MatchingEvaluation instance with all available matching
   * algorithms.
   * @return {MatchingEvaluation}
   */
  static all() {
    const adapters = [];
    for (const matchMode of Object.values(MatchPipeline.MATCH_MODES)) {
      adapters.unshift(new CpeeDiffAdapter(matchMode));
    }
    return new MatchingEvaluation(adapters);
  }

  /**
   * @inheritDoc
   * @param {String} rootDir The path to the directory containing the predefined
   *     match test case directories. A match test case directory at least
   *     includes an old and new process tree as XML documents and a set of
   *     rules for the expected matching.
   * @override
   */
  evalAll(rootDir = EvalConfig.MATCH_CASES_DIR) {
    Logger.section('Matching Evaluation with Cases from ' + rootDir, this);

    const resultsPerAdapter = new Map();
    for (const adapter of this._adapters) {
      resultsPerAdapter.set(adapter, []);
    }

    // Collect all test case directories
    const caseDirs = DirectoryScraper.scrape(rootDir);
    for (const testCaseDir of caseDirs) {
      const testCase = MatchTestCase.from(testCaseDir);

      if (testCase == null) {
        Logger.warn(
            'Skipping empty match test case directory ' + testCaseDir,
            this,
        );
        continue;
      }

      for (const adapter of this._adapters) {
        Logger.info(
            'Running match test  case ' + testCase.name +
            ' for ' + adapter.displayName + '...',
            this,
        );

        const result = adapter.evalCase(testCase);
        resultsPerAdapter.get(adapter).push(result);
      }
    }

    const aggregateResults = [];
    for (const [, resultsList] of resultsPerAdapter) {
      aggregateResults.push(AggregateMatchResult.of(resultsList));
    }
    const table = [
      AggregateMatchResult.header(),
      ...aggregateResults.map((result) => result.values()),
    ];
    Logger.result('Results of the matching evaluation' + ':\n' +
        markdownTable(table), this);
  }
}

