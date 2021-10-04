import { downloadPDFs } from './modules/announcementGetter.mjs';
import { extractPDFs } from './modules/pdfExtract.mjs';
import { downloadXLS } from './modules/financialGetter.mjs';
import { extractXLS } from './modules/xlsExtract.mjs';
import { DeltaZAltmansZScore, DeltaPustylnicksPScore, DeltaRealWealthRScore, DeltaPerceivedWealthPScore} from './modules/financialAlgorithms.mjs';

const companyCode = `bhp`;
const years = [ 2021, 2020 ];

await downloadPDFs(companyCode);
await downloadXLS(companyCode, years);

//const data = await extractPDFs(companyCode);
const XLSData = extractXLS(companyCode, years);

const DeltaZAltmansZScoreRes = DeltaZAltmansZScore(XLSData[2021], XLSData[2020]);
const DeltaPustylnicksPScoreRes = DeltaPustylnicksPScore(XLSData[2021], XLSData[2020]);

const DeltaRealWealthRScoreRes = DeltaRealWealthRScore(XLSData[2021], XLSData[2020]);
const DeltaPerceivedWealthPScoreRes = DeltaPerceivedWealthPScore(XLSData[2021], XLSData[2020]);

console.log(`Through Altmans and Pustylnicks scores, 𝝙P ${DeltaPustylnicksPScoreRes} > 𝝙Z ${DeltaZAltmansZScoreRes} = ${DeltaPustylnicksPScoreRes>DeltaZAltmansZScoreRes} suggests that ${companyCode} may be involved in manipulating their financial statements.`);
console.log(`Through Pustylnicks Real and Perceived wealth scores, if 𝝙P - 𝝙R = ${DeltaPerceivedWealthPScoreRes - DeltaRealWealthRScoreRes} > 0.3 = ${DeltaPerceivedWealthPScoreRes - DeltaRealWealthRScoreRes > 0.3} suggests ${companyCode} were more likely to be involved in financial statement manipulation`);