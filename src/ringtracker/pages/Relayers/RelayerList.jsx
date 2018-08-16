import React, { Component } from 'react';
import RelayerTable from './RelayerTable';

export default class RelayerList extends Component {
  static displayName = 'RelayerList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div class="ui segments">
          <div class="ui segment d-flex justify-content-between align-items-center">
            <div className="ml10 mr10 fs18 color-black font-weight-bold">Relayers</div>
            <div class="ui buttons basic mr10">
              <button class="ui button"></button>
            </div>
          </div>
          <div class="ui segment p20">
            <RelayerTable />
          </div>
        </div>
      </div>
    );
  }
}
