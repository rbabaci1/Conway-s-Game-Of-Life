import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./select.scss";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function SelectMenu({
  handleChange,
  values,
  value,
  separator = "",
  name = "GRID SIZE",
  width = "100px",
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl
        className={clsx(classes.formControl, classes.noLabel)}
        style={{ width: width }}
      >
        <Select
          value={value}
          onChange={handleChange}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={value} disabled>
            <em>{name}</em>
          </MenuItem>
          {values.map(val => {
            let [v1, v2] = val.split("_");
            return (
              <MenuItem key={val} value={val}>
                {v1} {separator} {v2}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
