export default function create() {
  return (
    <div className="container py-6">
      <div className="ant-card ant-card-bordered">
        <div className="ant-card-body">
          {/* <form> */}
          <p className="has-text-primary is-size-7">(*) is required field.</p>
          <div className="field">
            <label htmlFor="tokenType" className="label">
              Token Type<sup className="has-text-danger">*</sup>
            </label>
            <div className="control">
              <select name="tokenType" id="tokenType" className="input">
                <option value="standard">Standard Token</option>
                <option value="liquidity" disabled>
                  Liquidity Generator Token
                </option>
                <option value="baby" disabled>
                  Baby Token
                </option>
                <option value="buyback" disabled>
                  Buyback Baby Token
                </option>
              </select>
              <p className="help is-info"> 30 MATIC</p>
            </div>
          </div>
          <div className="field">
            <label htmlFor="tokenName" className="label">
              Name<sup className="has-text-danger">*</sup>
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="tokenName"
                name="tokenName"
                placeholder="Ex: Ethereum"
                maxLength={255}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="tokenSymbol" className="label">
              Symbol<sup className="has-text-danger">*</sup>
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="tokenSymbol"
                name="tokenSymbol"
                placeholder="Ex: ETH"
                maxLength={255}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="totalSupply" className="label">
              Total supply<sup className="has-text-danger">*</sup>
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                id="totalSupply"
                name="totalSupply"
                placeholder="Ex: 100000000000"
              />
            </div>
          </div>
          {/* <div className="field">
              <label className="ant-checkbox-wrapper">
                <span className="ant-checkbox">
                  <input
                    type="checkbox"
                    className="ant-checkbox-input"
                    value=""
                  />
                  <span className="ant-checkbox-inner"></span>
                </span>
                <span>Implement Pink Anti-Bot System?</span>
              </label>
            </div> */}
          <div className="has-text-centered mt-6 mb-4">
            <button className="ant-btn ant-btn-primary">
              <span>Create token</span>
            </button>
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
