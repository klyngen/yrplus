import { css, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { state } from "lit/decorators/state";
import "./components/arrow";
import "./components/location-search/location-search";
import "./components/summary-field/summary-field";
import "./components/weather-data/weather-data.component";
import "./components/slider-component/sider-component";
import { DAY, WeatherData } from "./service/httpClient";

@customElement("yr-extra")
export class YrExtra extends LitElement {
  @state()
  weatherData: WeatherData[] = [];

  @state()
  test: WeatherData = {
    day: DAY.SUNDAY,
    snapshots: [],
    summary: {
      averageWindSpeed: 3.1,
      averageGustSpeed: 4.5,
      averageWindDirection: 180,
      lowestTemperature: 6,
      highestTemperature: 26,
      averagePreassure: 1015,
      averageDewpoint: 10,
      averageHumidity: 50,
    },
  };

  static styles = css`
    .body {
      display: flex;
      justify-content: center;
      height: 20vh;
    }

    .location-search {
      display: flex;
      align-content: center;
      margin-top: 30px;
    }

    weather-data {
      height: 73vh;
      display: block;
    }

    .app {
      background-color: #012a38;
    }
  `;

  render(): TemplateResult {
    return html`
      <div class="app">
        <div class="body">
          <div class="location-search">
            <location-search></location-search>
          </div>
        </div>
        <weather-data></weather-data>
      </div>
    `;
  }
}
