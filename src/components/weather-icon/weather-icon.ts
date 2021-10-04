import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators/custom-element";
import { property } from "lit/decorators/property";
import styles from "./weather-icon.styles.scss";
//import linux from "@carbon/icons/es/linux/20";
import sun from "@carbon/icons/es/sun/20";
import cloudy from "@carbon/icons/es/cloudy/20";
import partcloudy from "@carbon/icons/es/partly-cloudy/20";
import fog from "@carbon/icons/es/fog/20";
import heavyrain from "@carbon/icons/es/rain--heavy/20";
import heavyrainthunder from "@carbon/icons/es/thunderstorm--strong/20";
import sleet from "@carbon/icons/es/sleet/20";
import rainscattered from "@carbon/icons/es/rain--scattered/20";
import heavysnow from "@carbon/icons/es/snow--heavy/20";
import thunderstormsevere from "@carbon/icons/es/thunderstorm--severe/20";
import thunderstormscattered from "@carbon/icons/es/thunderstorm--scattered/20";
import snowscattered from "@carbon/icons/es/snow--scattered/20";
import lightrain from "@carbon/icons/es/rain--drizzle/20";
import thunder from "@carbon/icons/es/thunderstorm/20";
import lightrainshowers from "@carbon/icons/es/thunderstorm--scattered/20";
import lightsnow from "@carbon/icons/es/cloud--snow/20";
import lightsnowshowers from "@carbon/icons/es/snow--scattered/20";
import mostlycloudy from "@carbon/icons/es/mostly-cloudy/20";
import snow from "@carbon/icons/es/snow/20";
import snowshowers from "@carbon/icons/es/snow--scattered/20";

import { IconDefinition } from "@carbon/icons/es/*";
import { getAttributes, toSVG } from "@carbon/icon-helpers";

@customElement("weather-icon")
export class WeatherIconComponent extends LitElement {
  static styles = styles;

  private _name: string = "";

  private translation: { key: string; def: IconDefinition }[] = [
    { key: "clearsky", def: sun },
    { key: "cloudy", def: cloudy },
    { key: "fair", def: partcloudy },
    { key: "fog", def: fog },
    { key: "heavyrain", def: heavyrain },
    { key: "heavyrainshowers", def: rainscattered },
    { key: "heavyrainandthunder", def: heavyrainthunder },
    { key: "heavysleet", def: sleet },
    { key: "heavysleetandthunder", def: sleet },
    { key: "heavysnow", def: heavysnow },
    { key: "heavysnowandthunder", def: thunderstormsevere },
    { key: "heavysnowshowers", def: snowscattered },
    {
      key: "heavysnowshowersandthunder",
      def: thunderstormsevere,
    },
    { key: "lightrain", def: lightrain },
    { key: "lightrainandthunder", def: thunder },
    { key: "lightrainshowers", def: lightrainshowers },
    { key: "lightsnow", def: lightsnow },
    {
      key: "lightsnowandthunder",
      def: thunderstormsevere,
    },
    { key: "lightsnowshowers", def: lightsnowshowers },
    {
      key: "lightssleetshowersandthunder",
      def: thunder,
    },
    {
      key: "lightssnowshowersandthunder",
      def: thunder,
    },
    { key: "partlycloudy", def: mostlycloudy },
    { key: "rain", def: heavyrain },
    { key: "rainandthunder", def: heavyrainthunder },
    { key: "rainshowers", def: rainscattered },
    {
      key: "rainshowersandthunder",
      def: thunderstormscattered,
    },
    { key: "sleet", def: sleet },
    { key: "sleetandthunder", def: thunderstormsevere },
    { key: "sleetandshowers", def: sleet },
    {
      key: "sleetshowersandthunder",
      def: thunderstormsevere,
    },
    { key: "snow", def: snow },
    { key: "snowandthunder", def: thunderstormsevere },
    { key: "snowshowers", def: snowshowers },
    {
      key: "snowshowersandthunder",
      def: thunderstormsevere,
    },
  ];

  @property()
  icon: IconDefinition;

  @property()
  size: number = 20;

  @property()
  set name(x: string) {
    if (!x || x.length === 0) return;
    this._name = x;
    this.icon = this.resolveFontawesomeIcon(x);
  }

  get name(): string {
    return this._name;
  }

  render(): TemplateResult {
    return html`${this.renderNode(this.icon)}`;
  }

  private resolveFontawesomeIcon(icon: string): IconDefinition {
    const trimmedName = icon.split("_")[0];
    const translation = this.translation.find(
      (item) => item.key === trimmedName
    );
    if (!translation) {
      return cloudy;
    }
    return translation.def;
  }

  private renderNode(icon: IconDefinition): SVGElement {
    if (!icon) return null;
    const element = toSVG({
      ...icon,
      attrs: getAttributes(icon.attrs),
    });
    element.setAttribute('height', `${this.size}`);
    element.setAttribute('width', `${this.size}`);
    return element;
  }
}
