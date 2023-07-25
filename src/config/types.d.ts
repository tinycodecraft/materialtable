import { MRT_ColumnDef } from "material-react-table";

export type CharacterType = {
  id: number;
  name: string;
  status: string,
  species: string,
  gender: string
};

export type CharacterRowType = {
  isItemLoaded: (index: number) => boolean;
  items: CharacterType[];
};

export type PageInfoType ={
    count: number,
    pages: number,
    next: string,
    prev: string,
}


export type CharacterResultResponse ={
    results: CharacterType[],
    info: PageInfoType

}

export const FETCHSIZE = 20;


export const CHARACTER_COLUMNS: MRT_ColumnDef<CharacterType>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'species',
    header: 'Species',
  },
  
];