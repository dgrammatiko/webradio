export class CustomForm extends HTMLElement {
  constructor() {
    super();

    this.country = '';
    this.station = '';
    this.dataCache = this.data;

    this.countryChange = this.countryChange.bind(this);
    this.stationChange = this.stationChange.bind(this);
  }

  connectedCallback() {
    this.innerHTML = '';
    this.form = document.createElement('form');
    this.fieldset = document.createElement('fieldset');
    this.fieldset.setAttribute('aria-label', 'Station Selector');
    this.append(this.form);
    this.form.append(this.fieldset);
    this.renderSelectEl('country', 'countryChange');
    this.renderSelectEl('station', 'stationChange');
    this.renderCountries();
    this.renderStations();
  }

  disconnectedCallback() {
    if (this.countrySelect) this.countrySelect.addEventListener('input', this.countryChange);
    if (this.stationSelect) this.stationSelect.addEventListener('input', this.stationChange);
  }

  get data() {
    try {
      return JSON.parse(this.getAttribute('data'));
    } catch (e) {
      return {}
    }
  }

  countryChange(event) {
    this.country = event.target.value;
    this.stations = this.dataCache.stations[this.country];
    this.station = '';
    this.renderStations();
  }

  stationChange(event) {
    this.station = event.target.value;
    this.dispatchEvent(new CustomEvent('station-change', {detail: {station: this.dataCache.stations[this.country].filter(x => x.code === this.station)?.[0]}}));
  }

  renderSelectEl(name, callback) {
    const upper = name.slice(0,1).toUpperCase() + name.slice(1);
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = upper;
    this[`${name}Select`] = document.createElement('select');
    this[`${name}Select`].setAttribute('name', name);
    this[`${name}Select`].setAttribute('id', name);
    this[`${name}Select`].addEventListener('input', this[callback]);
    this.fieldset.append(label);
    this.fieldset.append(this[`${name}Select`]);
  }

  renderCountries() {
    this.dataCache.countries.map(country => {
      const option = document.createElement('option');
      option.setAttribute('value', country.code);
      option.textContent = country.name;
      this.countrySelect.appendChild(option);
    });
  }
  renderStations() {
    if (this.country && this.data.stations[this.country]) {
      this.stationSelect.innerHTML = '';
      const stations = [{code: '', name: 'Select a Station'}, ...this.dataCache.stations[this.country]];
      stations.map(country => {
        const option = document.createElement('option');
        option.setAttribute('value', country.code);
        option.textContent = country.name;
        this.stationSelect.appendChild(option);
      });
      return this.stationSelect;
    } else {
      this.stationSelect.innerHTML = '<option value="" selected="true">First select a country</option>';
      return this.stationSelect;
    }
  }
}
customElements.define('custom-form', CustomForm);
