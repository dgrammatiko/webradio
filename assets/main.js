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

export class RadioPlayer extends HTMLElement {
  constructor() {
    super();

    // HTML Elements references
    this.playButton = null;
    this.muteButton = null;
    this.volumeControl = null;
    this.audioEl = null;

    // State
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 69;
    this._station = {
      name: 'No Station',
      stream: '',
      imageUrl: '',
    };

    this.onPlayPause = this.onPlayPause.bind(this);
    this.onVolumeInput = this.onVolumeInput.bind(this);
    this.onMute = this.onMute.bind(this);
  }

  get station() { return this._station; }
  set station(obj) {
    if (typeof obj === 'object' && obj.name && obj.stream ) { //&& obj.imageUrl
      this._station = obj;

      if (this.audioEl && this.isPlaying) {
        this.audioEl.pause();
        this.isPlaying = false;
        this.playButton.innerHTML = icons.play;
        this.playButton.setAttribute('aria-label', 'play');
        this.playButton.setAttribute('aria-pressed', 'false');
      }
      if (this._station.stream) this.audioEl = new Audio(this._station.stream);
      if (this.playButton) this.playButton.removeAttribute('disabled');
      if (this.stationName) this.stationName.textContent = ` ${this._station.name}`;
      if (this.stationImage) this.stationImage.src = this._station.imageUrl;
    }
  }

  connectedCallback() {
    this.innerHTML = '';
    this.renderOnce();

    this.playButton = this.querySelector('.play-pause-button');
    this.muteButton = this.querySelector('.mute-button');
    this.volumeControl = this.querySelector('.volume-control');
    this.stationName = this.querySelector('.currently-playing-title');
    this.stationImage = this.querySelector('.currently-playing-image');
    this.playButton.addEventListener('click', this.onPlayPause);
    this.muteButton.addEventListener('click', this.onMute);
    this.volumeControl.addEventListener('input', this.onVolumeInput);
  }

  disconnectedCallback() {
    this.audio = null;
    this.playButton = null;
    this.muteButton = null;
    this.volumeControl = null;
    this.isPlaying = false;
    this.isMuted = false;

    this.playButton.removeEventListener('click', this.onPlayPause);
    this.muteButton.removeEventListener('click', this.onMute);
    this.volumeControl.removeEventListener('input', this.onVolumeInput);
    this.innerHTML = '';
  }

  onPlayPause() {
    if (this.playButton.hasAttribute('disabled')) return;
    if (this.audioEl.paused) {
      this.audioEl.play();
      this.isPlaying = true;
      this.audioEl.volume = this.volume / 100;
      this.playButton.innerHTML = icons.pause;
      this.playButton.setAttribute('aria-label', 'pause');
      this.playButton.setAttribute('aria-pressed', 'true');
    } else {
      this.audioEl.pause();
      this.isPlaying = false;
      this.playButton.innerHTML = icons.play;
      this.playButton.setAttribute('aria-label', 'play');
      this.playButton.setAttribute('aria-pressed', 'false');
    }
  }

  onVolumeInput(e) {
    this.volume = e.target.value;
    this.isMuted = false;
    this.onMute({ target: this.volumeControl });
  }

  onMute(e) {
    if (e.target === this.muteButton || e.target.parentNode === this.muteButton) {
      this.isMuted = !this.isMuted;
    }
    if (this.audioEl) this.audioEl.volume = this.isMuted ? 0 : this.volume / 100;
    this.muteButton.innerHTML = this.isMuted ? icons.mute : icons.unmute;
    this.muteButton.setAttribute('aria-label', this.isMuted ? 'unmute' : 'mute');
    this.muteButton.setAttribute('aria-pressed', this.isMuted ? 'true' : 'false');
  }

  renderOnce() {
    this.innerHTML =`
<button class="play-pause-button" type="button" aria-label="pause" aria-pressed="false" disabled>${icons.play}</button>

<div class="currently-playing" aria-label="Currently playing">
  <span class="currently-playing-title">No Station</span>
  <img class="currently-playing-image" />
</div>

<div class="volume-controls">
  <button type="button" class="mute-button" aria-label="Unmute" aria-pressed="false">${icons.unmute}</button>
  <input type="range" name="volume" class="volume-control" min="0" max="100" step="1" value=${this.volume} aria-label="Volume">
</div>`;
  }
}

// Icons
const icons = {
  pause: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-pause" viewBox="0 0 16 16"><path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/></svg>',
  play: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>',
  mute: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>',
  unmute: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>'
};
