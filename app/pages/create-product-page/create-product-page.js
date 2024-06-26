/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { randomID } from '@bbva-web-components/bbva-core-lit-helpers/utils/randomId.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './create-product-page-styles.js';


const DEFAULT_I18N_KEYS = {
  formHeading: 'create-product-page.form-heading',
  labelInput1: 'create-product-page.form-input-1-label',
  labelInput2: 'create-product-page.form-input-2-label',
  labelInput3: 'create-product-page.form-input-3-label',
  labelButton: 'create-product-page.form-button'
};
/* eslint-disable new-cap */
class CreateProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'create-product-page';
  }

  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      showForm: {
        type: Boolean,
        attribute: 'show-form',
      },
      _uniqueId: {
        type: String,
        attribute: false,
      },
    };
  }

  constructor() {
    super();
    this.i18nKeys = {};
    this.showForm = false;
    this._uniqueId = randomID();
  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    const queryScope = this.shadowRoot || this;
    this._dm = queryScope.querySelector('demo-data-dm');
    this._form = queryScope.querySelector('form');
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = {...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    super.update && super.update(props);
  }

  onPageEnter() {
    this._resetForm();
  }

  _resetForm() {
    this.shadowRoot.getElementById('product').value = '';
    this.shadowRoot.getElementById('price').value = '';
    this.shadowRoot.getElementById('description').value = '';
  }


  render() {
    return html ` 
      <demo-web-template
        page-title="Create Product"
      >
        <div slot="app-main-content">
          ${this._formCreateProductTpl}
        </div>
        
      </demo-web-template>
    `;
  }

  get _formCreateProductTpl() {
    return html `
        <form enctype="multipart/form-data">        
          <h2>${this.t(this._i18nKeys.formHeading)}</h2>
          <bbva-web-form-text id="product" label="${this.t(this._i18nKeys.labelInput1)}"></bbva-web-form-text>
          <bbva-web-form-amount id="price" label="${this.t(this._i18nKeys.labelInput2)}"></bbva-web-form-amount>
          <bbva-web-form-text id="description" label="${this.t(this._i18nKeys.labelInput3)}"></bbva-web-form-text>
          <bbva-web-button-default
            id="send"
            type="button" 
            @click="${this._doCreateProduct}"
          >
            ${this.t(this._i18nKeys.labelButton)}
          </bbva-web-button-default>
        </form>
    `;
  }

  _doCreateProduct(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    const product = this.shadowRoot.getElementById('product').value;
    const price = this.shadowRoot.getElementById('price').value;
    const description = this.shadowRoot.getElementById('description').value;

    if (product && price && description) {
      const newProduct = { product, price, description };
      this.publish('queue_products', newProduct);
      this.navigate('list-product');
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}

window.customElements.define(CreateProductPage.is, CreateProductPage);