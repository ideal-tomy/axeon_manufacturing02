export const pages=['hero','dashboard','incident','root-cause','corrective'];
export const state={page:0,selectedCause:'fixture',completed:false,approved:false,knowledge:false,zoom:false};
export function go(page){state.page=Math.max(0,Math.min(4,page));}
