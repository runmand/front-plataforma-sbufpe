export type TPROPS = {
	isLoading: boolean;
	isDisabled?: boolean;
	onConfirm?: () => void;
	onClickDownload?:() => void
	isPdfDownloadable?:boolean
};
