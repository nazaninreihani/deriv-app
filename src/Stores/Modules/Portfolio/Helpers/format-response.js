import { getUnsupportedContracts } from 'Constants';
import { getSymbolDisplayName }    from '../../Trading/Helpers/active-symbols';
import { getMarketInformation }    from '../../../../Modules/Reports/Helpers/market-underlying';

export const formatPortfolioPosition = (portfolio_pos, active_symbols = []) => {
    const purchase     = parseFloat(portfolio_pos.buy_price);
    const payout       = parseFloat(portfolio_pos.payout);
    const display_name = getSymbolDisplayName(
        active_symbols,
        getMarketInformation(portfolio_pos.shortcode).underlying
    );

    return {
        contract_info : portfolio_pos,
        details       : portfolio_pos.longcode.replace(/\n/g, '<br />'),
        display_name,
        id            : portfolio_pos.contract_id,
        indicative    : 0,
        payout,
        purchase,
        reference     : +portfolio_pos.transaction_id,
        type          : portfolio_pos.contract_type,
        is_unsupported: !!getUnsupportedContracts()[portfolio_pos.contract_type],
    };
};
