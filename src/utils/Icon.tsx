import React, { FC, forwardRef, LegacyRef, HTMLAttributes } from "react";
import styled from "@emotion/styled";

import { ReactComponent as Saved } from "../utils/icons/Saved.svg";
import { ReactComponent as Cook } from "../utils/icons/Cook.svg";
import { ReactComponent as IconD } from "../utils/icons/IconD.svg";
import { ReactComponent as Exit } from "../utils/icons/Exit.svg";
import { ReactComponent as Heart } from "../utils/icons/Heart.svg";

import { ReactComponent as Plus } from "../utils/icons/Plus.svg";
export const iconMap = {
  Saved,
  Cook,
  IconD,
  Exit,
  Plus,
  Heart,
};

export type IconType = keyof typeof iconMap;

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  type: IconType;
  color?: string;
  width?: string;
  height?: string;
}

const Container = styled("svg")<Partial<IconProps>>`
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 1;
  color: black;
  vertical-align: -0.125em;
`;
const ContainerAbsolute = styled("svg")<Partial<IconProps>>`
  margin-top: 0px;
  right: 0;
  color: ${({ color }) => color ?? "inherit"};
  /* vertical-align: -0.125em; */
  position: absolute;
`;
const ContainerSmall = styled("svg")<Partial<IconProps>>`
  display: inline-block;
  height: 15px;
  width: 15px;
  line-height: 1;

  color: ${({ color }) => color ?? "inherit"};
  vertical-align: -0.125em;
`;
const ContainerMed = styled("svg")<Partial<IconProps>>`
  display: inline-block;
  height: 12px;
  width: 12px;
  line-height: 1;

  color: ${({ color }) => color ?? "inherit"};
  vertical-align: -0.125em;
`;
const ContainerH = styled("svg")<Partial<IconProps>>`
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 1;
  color: black;
  vertical-align: -0.125em;
  :hover {
    color: red;
  }
`;
export const Icon: FC<IconProps> = forwardRef(
  ({ type, ...svgProps }, ref: LegacyRef<SVGSVGElement>) => (
    <Container as={iconMap[type]} {...svgProps} ref={ref} />
  ),
);
export const IconAbsolute: FC<IconProps> = forwardRef(
  ({ type, ...svgProps }, ref: LegacyRef<SVGSVGElement>) => (
    <ContainerAbsolute as={iconMap[type]} {...svgProps} ref={ref} />
  ),
);
export const IconSmall: FC<IconProps> = forwardRef(
  ({ type, ...svgProps }, ref: LegacyRef<SVGSVGElement>) => (
    <ContainerSmall as={iconMap[type]} {...svgProps} ref={ref} />
  ),
);
export const IconMed: FC<IconProps> = forwardRef(
  ({ type, ...svgProps }, ref: LegacyRef<SVGSVGElement>) => (
    <ContainerMed as={iconMap[type]} {...svgProps} ref={ref} />
  ),
);
export const IconHeart: FC<IconProps> = forwardRef(
  ({ type, ...svgProps }, ref: LegacyRef<SVGSVGElement>) => (
    <ContainerH as={iconMap[type]} {...svgProps} ref={ref} />
  ),
);
