/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { randomID } from '@bbva-web-components/bbva-core-lit-helpers/utils/randomId.js';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-amount/bbva-web-form-amount.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './list-product-page-styles.js';


const DEFAULT_I18N_KEYS = {
  formHeading2: 'list-product-page.form-heading',
  labelButton2: 'create-product-page.form-button2',
};
/* eslint-disable new-cap */
class ListProductPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'list-product-page';
  }

  // Borramos propiedades que no estamos utilizando
  static get properties() {
    return {
      i18nKeys: {
        type: Object,
        attribute: false,
      },
    };
  }

  // Borramos propiedades que no estamos utilizando
  constructor() {
    super();
    this.i18nKeys = {};
    this._products = [];
  }

  static get styles() {
    return [ styles ];
  }

  firstUpdated(props) {
    super.firstUpdated && super.firstUpdated(props);
    window.IntlMsg.lang = localStorage.getItem('language') || 'en-US';
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = {...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    super.update && super.update(props);
  }

  // NO debería hacer falta comprobar si es un array
  onPageEnter() {
    const existingProducts = JSON.parse(localStorage.getItem('bbdd_product')) || [];
    this._products = [
      ...this._products,
      ...existingProducts,
    ];

    this.subscribe('queue_products', (ev) => {
      this._products = ev;
      existingProducts.push(this._products);
      localStorage.setItem('bbdd_product', JSON.stringify(existingProducts));
      this._updateProductList();
    });

    this._updateProductList();
  }

  _updateProductList() {
    this._products = JSON.parse(localStorage.getItem('bbdd_product')) || [];
    this.requestUpdate();
  }

  // Hecho en falta el campo de imagen y para borrar la card
  render() {
    return html `
      <demo-web-template page-title="List Product">
        <div slot="app-main-content">${this._cardListProduct}</div>
      </demo-web-template>
    `;
  }

  // 💪 Muy bien hemos utilizado el componente Card de BBVA
  get _cardListProduct() {
    return html `
      <div>
        <table style="width:49%">
          <tr>
            <td>
              <h2>${this.t(this._i18nKeys.formHeading2)}</h2>
            </td>
            <td style="text-align:right">
              <bbva-web-button-default
                id="send"
                type="button"
                @click="${this._goCreateProduct}"
              >
                ${this.t(this._i18nKeys.labelButton2)}
              </bbva-web-button-default>
            </td>
          </tr>
        </table>
        ${this._products.map(
    (product) => html`
            <bbva-web-card-product
              badge-text="${product.product}"
              heading="${product.price}€"
            >
              <p slot="description">${product.description}</p>
            </bbva-web-card-product>
          `
  )}
      </div>
    `;
  }

  _goCreateProduct() {
    this.navigate('create-product');
  }
}

window.customElements.define(ListProductPage.is, ListProductPage);