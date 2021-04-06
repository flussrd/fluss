import { Checkbox, FormControl, FormControlLabel, FormGroup } from "@material-ui/core";
import { ViewColumn } from "@material-ui/icons";
import PopoverIcon from "../../../PopoverIcon";
import { DataTableColumn } from "../../DataTable";
import { ChangeEvent, CSSProperties, FC } from "react";
import { ColumnInstance } from "react-table";

export interface ShowColumnsProps<T extends object> {
  columns: DataTableColumn<T>[];
  title?: string;
  labeled?: boolean;
}

interface HiddenProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
  title: string;
}

function ShowColumns<T extends object>({ columns, title, labeled }: ShowColumnsProps<T>) {
  return (
    <PopoverIcon title={title} icon={ViewColumn} labeled={labeled}>
      <FormControl component="fieldset">
        <FormGroup>
          {columns.map((column: DataTableColumn<T>) => {
            const hiddenProps: HiddenProps = (column as ColumnInstance<T>).getToggleHiddenProps();
            return (
              <FormControlLabel
                key={column.id}
                label={column.Header as string}
                control={
                  <Checkbox
                    checked={hiddenProps.checked}
                    name={column.Header as string}
                    onChange={hiddenProps.onChange}
                  />
                }
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </PopoverIcon>
  );
}

(ShowColumns as FC<ShowColumnsProps<any>>).defaultProps = {
  title: "Columnas",
  labeled: false,
};

export default ShowColumns;
