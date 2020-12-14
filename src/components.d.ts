/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MatchResults } from "@stencil/router";
export namespace Components {
    interface AppHome {
    }
    interface AppNdc {
        "match": MatchResults;
    }
    interface AppProfile {
        "match": MatchResults;
    }
    interface AppRoot {
    }
    interface IwsEventFlights {
        "config": string;
    }
    interface IwsEventListener {
    }
    interface IwsEventsBooking {
        "config": string;
    }
    interface IwsEventsFinder {
        "config": string;
    }
    interface IwsWordpress {
        "config": string;
    }
    interface UcSpinner {
    }
}
declare global {
    interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {
    }
    var HTMLAppHomeElement: {
        prototype: HTMLAppHomeElement;
        new (): HTMLAppHomeElement;
    };
    interface HTMLAppNdcElement extends Components.AppNdc, HTMLStencilElement {
    }
    var HTMLAppNdcElement: {
        prototype: HTMLAppNdcElement;
        new (): HTMLAppNdcElement;
    };
    interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {
    }
    var HTMLAppProfileElement: {
        prototype: HTMLAppProfileElement;
        new (): HTMLAppProfileElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLIwsEventFlightsElement extends Components.IwsEventFlights, HTMLStencilElement {
    }
    var HTMLIwsEventFlightsElement: {
        prototype: HTMLIwsEventFlightsElement;
        new (): HTMLIwsEventFlightsElement;
    };
    interface HTMLIwsEventListenerElement extends Components.IwsEventListener, HTMLStencilElement {
    }
    var HTMLIwsEventListenerElement: {
        prototype: HTMLIwsEventListenerElement;
        new (): HTMLIwsEventListenerElement;
    };
    interface HTMLIwsEventsBookingElement extends Components.IwsEventsBooking, HTMLStencilElement {
    }
    var HTMLIwsEventsBookingElement: {
        prototype: HTMLIwsEventsBookingElement;
        new (): HTMLIwsEventsBookingElement;
    };
    interface HTMLIwsEventsFinderElement extends Components.IwsEventsFinder, HTMLStencilElement {
    }
    var HTMLIwsEventsFinderElement: {
        prototype: HTMLIwsEventsFinderElement;
        new (): HTMLIwsEventsFinderElement;
    };
    interface HTMLIwsWordpressElement extends Components.IwsWordpress, HTMLStencilElement {
    }
    var HTMLIwsWordpressElement: {
        prototype: HTMLIwsWordpressElement;
        new (): HTMLIwsWordpressElement;
    };
    interface HTMLUcSpinnerElement extends Components.UcSpinner, HTMLStencilElement {
    }
    var HTMLUcSpinnerElement: {
        prototype: HTMLUcSpinnerElement;
        new (): HTMLUcSpinnerElement;
    };
    interface HTMLElementTagNameMap {
        "app-home": HTMLAppHomeElement;
        "app-ndc": HTMLAppNdcElement;
        "app-profile": HTMLAppProfileElement;
        "app-root": HTMLAppRootElement;
        "iws-event-flights": HTMLIwsEventFlightsElement;
        "iws-event-listener": HTMLIwsEventListenerElement;
        "iws-events-booking": HTMLIwsEventsBookingElement;
        "iws-events-finder": HTMLIwsEventsFinderElement;
        "iws-wordpress": HTMLIwsWordpressElement;
        "uc-spinner": HTMLUcSpinnerElement;
    }
}
declare namespace LocalJSX {
    interface AppHome {
    }
    interface AppNdc {
        "match"?: MatchResults;
    }
    interface AppProfile {
        "match"?: MatchResults;
    }
    interface AppRoot {
    }
    interface IwsEventFlights {
        "config"?: string;
        "onIwsFlightSelected"?: (event: CustomEvent<string>) => void;
    }
    interface IwsEventListener {
    }
    interface IwsEventsBooking {
        "config"?: string;
    }
    interface IwsEventsFinder {
        "config"?: string;
        "onIwsConferenceSelected"?: (event: CustomEvent<string>) => void;
    }
    interface IwsWordpress {
        "config"?: string;
    }
    interface UcSpinner {
    }
    interface IntrinsicElements {
        "app-home": AppHome;
        "app-ndc": AppNdc;
        "app-profile": AppProfile;
        "app-root": AppRoot;
        "iws-event-flights": IwsEventFlights;
        "iws-event-listener": IwsEventListener;
        "iws-events-booking": IwsEventsBooking;
        "iws-events-finder": IwsEventsFinder;
        "iws-wordpress": IwsWordpress;
        "uc-spinner": UcSpinner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-home": LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
            "app-ndc": LocalJSX.AppNdc & JSXBase.HTMLAttributes<HTMLAppNdcElement>;
            "app-profile": LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "iws-event-flights": LocalJSX.IwsEventFlights & JSXBase.HTMLAttributes<HTMLIwsEventFlightsElement>;
            "iws-event-listener": LocalJSX.IwsEventListener & JSXBase.HTMLAttributes<HTMLIwsEventListenerElement>;
            "iws-events-booking": LocalJSX.IwsEventsBooking & JSXBase.HTMLAttributes<HTMLIwsEventsBookingElement>;
            "iws-events-finder": LocalJSX.IwsEventsFinder & JSXBase.HTMLAttributes<HTMLIwsEventsFinderElement>;
            "iws-wordpress": LocalJSX.IwsWordpress & JSXBase.HTMLAttributes<HTMLIwsWordpressElement>;
            "uc-spinner": LocalJSX.UcSpinner & JSXBase.HTMLAttributes<HTMLUcSpinnerElement>;
        }
    }
}
