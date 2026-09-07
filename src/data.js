export const incident={id:'a214-scratch',part:'主力部品 A-214',defect:'表面キズ',line:'Cライン',process:'外観検査',lot:'LOT-260907-C',detectedAt:'14:08',severity:'中',image:'/assets/a214.png',confidence:91,position:'右上端部'};
export const metrics=[['本日の不具合','12','件'],['重大度高','2','件'],['対応中','4','件'],['本日クローズ','7','件']];
export const events=[['13:42','加工完了','加工実績'],['13:49','搬送','搬送履歴'],['13:54','外観検査','検査工程'],['14:08','表面キズを検出','検査結果'],['14:12','類似事例を照合','画像検索'],['14:16','原因候補を提示','分析結果']];
export const causes=[['fixture','搬送治具の接触痕の可能性','高','キズ位置が類似事例と一致'],['staging','前工程での仮置き時の擦れ','中','同一ラインで直近3件発生'],['storage','保管時の接触','低','保管履歴からは該当なし']];
export const actions=[['fixture-check','搬送治具の接触面を点検'],['staging-update','仮置き手順を見直す'],['inspection-add','外観検査の重点箇所を追加']];
export const similar=[['類似キズ 01','位置が近い'],['類似キズ 02','形状が近い'],['正常品','比較用']];
export const incidents=[['主力部品 A-214','表面キズ','Cライン','14:08','要因調査中','medium'],['ブラケット B-103','打痕','Aライン','13:26','確認待ち','low'],['ケース M-202','塗装ムラ','Bライン','11:52','完了','done']];
