/// <reference types="vite/client" />
export declare global {
    // 假设这是高德地图Map类的部分类型定义
    interface AMap {
      Map: new (
        container: string | HTMLElement,
        options?: AMap.MapOptions
      ) => AMap.Map;
      ControlBar: new (opts?: AMap.ControlConfig) => AMap.ControlBar;
      ToolBar: new (opts?: AMap.ControlConfig) => AMap.ToolBar;
      LngLat: new (lng: number, lat: number) => AMap.LngLat;
      Marker: new (opts?: AMap.MarkerConfig) => AMap.Marker;
      Pixel: new (lng: number, lat: number) => AMap.Pixel;
      Polyline: new (opts?: AMap.PolylineConfig) => AMap.Polyline;
    }
    interface Loca {
      Container: new (opts: Loca.LocaOptions) => Loca.Container;
    }
    // 定义一个命名空间,允许将相关的类、接口和其他类型组织在一起。
    // 当需要在外部访问命名空间内部的内容时，可以通过.操作符进行限定访问。
    namespace AMap {
      interface MapOptions {
        center?: [Number, Number] | LngLat;
        zoom?: Number;
        pitch?: Number;
        viewMode?: String;
        rotateEnable?: Boolean;
        pitchEnable?: Boolean;
        rotation?: Number;
        zooms?: Array;
        mapStyle?: String;
      }
      interface Map {
        // setZoom(zoom: number): void;
        // setCenter(position: AMap.LngLat | [number, number]): void;
        addControl(control: Control): void;
        remove(marker: AMap.Marker): void;
        destroy(): void;
        getCenter() : AMap.LngLat;
        setStatus({zoomEnable: boolean}):void
        // 其他Map方法的类型声明...
      }
      interface ControlBar {}
      interface Control {}
      interface ToolBar {}
      interface LngLat {
        toArray: () => [number, number];
      }
      interface Marker {}
      interface Pixel {}
      interface Polyline {}
      interface ControlConfig {
        position?: {
          top?: string;
          left?: string;
          right?: string;
          bottom?: string;
        };
       
      }
      interface MarkerConfig{
        offset?: AMap.Pixel;
        position?: AMap.LngLat;
        content?: string | HTMLElement;
        map?: AMap.Map;
        offset?: AMap.Pixel;
      }
      interface PolylineConfig {
        path: number[][];
        isOutline: boolean;
        strokeColor: string;
        strokeOpacity: number;
        strokeWeight: number;
        strokeStyle: string;
        lineJoin: string;
        lineCap: string;
        zIndex: number;
        map: AMap.Map;
      }
    }
  
    namespace Loca {
      interface LocaOptions {
        map: AMap.Map;
      }
      interface Container {
        animate: {
          start(): void;
        };
        viewControl: {
          addTrackAnimate(options?: TrackAnimateOptions,callback?: () => void): void;
          resumeAnimate(): void;
          pauseAnimate(): void;
        }
      }
      interface TrackAnimateOptions {
        path?: number[][],
        duration: number, 
        timing: number[][],
        rotationSpeed: number,
      }
    }
  
    interface Window {
      AMap: AMap | undefined;
      Loca: Loca | undefined;
    }
  }
  
