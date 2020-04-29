import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react';
import { getGUID } from "@pnp/common";

import styles from './StepperSimple.module.scss';

export enum StepperSimpleDesign {
    Button = "button",
    Bar = "bar"
}

export enum StepperSimpleTense {
    Past = "past",
    Active = "active",
    Futher = "futher"
}

export interface IStepperSimpleOption {
    text: string;
}

export interface IStepperSimpleProps {
    selectedIndex?: number;
    items?: IStepperSimpleOption[];
    design?: StepperSimpleDesign;
    disabled?: boolean;
    onChange(value: number): void;
    noBack?: boolean;
}

export function StepperSimple(props: IStepperSimpleProps) {
    const selectedIndex: number = props.selectedIndex || 0;
    const items: IStepperSimpleOption[] = props.items || [];
    const design: StepperSimpleDesign =  props.design || StepperSimpleDesign.Bar;
    const disabled: boolean = props.disabled || false;
    const noBack: boolean = props.noBack || false;

    const isFirst = () => { return selectedIndex === 0 };
    const isLast = () => { return items.length === selectedIndex + 1 };
    // const isPast = () => { return }


    const itemsView: React.ReactNode[] = items.map((item: IStepperSimpleOption, index: number) => {
        const isPast = () => { return index < selectedIndex }
        const isActive = () => { return index === selectedIndex }
        const isFuther = () => { return index > selectedIndex }

        const tense = (): StepperSimpleTense => {
            if(isPast()) {
                return StepperSimpleTense.Past;
            }

            if(isFuther()) {
                return StepperSimpleTense.Futher;
            }

            return StepperSimpleTense.Active;
        }

        if(design === StepperSimpleDesign.Bar) {
            return (
                <StepperBar
                    key={getGUID()}
                    selectedIndex={selectedIndex}
                    disabled={disabled}
                    onChange={props.onChange}
                    tense={tense()}
                    text={item.text}
                    visible={true}
                />
            );
        }

        if(design === StepperSimpleDesign.Button && isActive()) {
            const textNext = (): string => {
                if(isLast()) {
                    return "Finish";
                }

                return "Weiter";
            }

            return (
                <div className={styles.itemButtonContainer}>
                    {/* Back */}
                    <StepperButton
                        key={getGUID()}
                        selectedIndex={selectedIndex + -1}
                        disabled={disabled || isFirst()}
                        onChange={props.onChange}
                        tense={tense()}
                        text={"Zurück"}
                        visible={!noBack}
                    />
                    {/* Next */}
                    <StepperButton
                        key={getGUID()}
                        selectedIndex={selectedIndex + 1}
                        disabled={disabled}
                        onChange={props.onChange}
                        tense={tense()}
                        text={textNext()}
                        visible={true}
                    />
                </div>
            );
        }

        return null;

    });

    return (
      <div className={styles.container}>
          {itemsView.map((item: React.ReactNode) => {
              return item;
          })}
      </div>
    );
}
  
export default StepperSimple;

export interface IStepperSimpleElement {
    selectedIndex: number;
    tense: StepperSimpleTense;
    disabled: boolean;
    visible: boolean
    onChange(value: number): void;
    text: string;
}

function StepperButton(props: IStepperSimpleElement) {
    if(props.visible) {
        return (
            <div>
                <PrimaryButton text={props.text} onClick={() =>props.onChange(props.selectedIndex)} disabled={props.disabled} />
            </div>
        )
    }
    return null;
}

function StepperBar(props: IStepperSimpleElement) {
    if(props.visible) {
        return (
            <div className={styles.itemBar}>
                {props.text}
            </div>
        )
    }
    return null;
}