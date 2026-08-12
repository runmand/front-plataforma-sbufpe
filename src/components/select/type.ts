import { filterApply } from "@components/old-data/type";

export type itemType = {
    title: string;
    value: string;
};

export type Tprop = {
    className: string;
    title: string;
    type: string;
    list: string[];
    selected?: itemType;
    setFilter: (type: string, data: string) => void;
    filter: filterApply;
};
