import { Props } from "react-input-mask";

declare module "react-input-mask" {
  interface Props extends Props {
    maskChar?: string;
  }
}
