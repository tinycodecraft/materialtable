import { MRT_ColumnDef } from "material-react-table";
import { type CharacterType } from "./types";

export const FETCHSIZE = 20;

export const getColumns = (tablename: string = "character") => {
  if (!tablename)
    return [
      {
        accessorKey: "id",
        header: "Id",
      },
    ] as MRT_ColumnDef<CharacterType>[];

  return [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "gender",
      header: "Gender",
    },
    {
      accessorKey: "species",
      header: "Species",
    },
  ] as MRT_ColumnDef<CharacterType>[];
};
