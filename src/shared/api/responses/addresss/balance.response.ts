type BalanceSuccessResponse = {
	status: 'success';
	data: {
		balance: string;
		balanceUsdValue: number;
	};
};

type BalanceFailureResponse = {
	status: 'failure';
	data: null;
};

export type BalanceResponse = BalanceSuccessResponse | BalanceFailureResponse;
