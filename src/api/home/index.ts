//统一管理首页接口
import request from "@/utils/request";
import request2 from "@/utils/request2"; //自己服务器的
//引入ts类型
import type {
  HospitalResponseData,
  HospitalLevelOrReginResponseData,
  HospitalInfo,
} from "./type";

//通过枚举管理首页接口
enum API {
  HOSPITAL_URL = "/hosp/hospital/",
  //获得医院等级与地区接口
  HOSPITAL_LEVEL_URL = "/cmn/dict/findByDictCode/",
  //搜索框根据关键字
  HOSPITALINFO_URL = "/hosp/findByHosname/",
}
//获取医院信息
export const reqHospital = (
  page: number,
  limit: number,
  hostype = "",
  districtCode = ""
) => {
  // return request.get<any, HospitalResponseData>(
  //   API.HOSPITAL_URL +
  //     `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  // );
  return request2.get<any, HospitalResponseData>(
    API.HOSPITAL_URL +
      `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  );
  // , hostype.value, districtCode.value
};
// 根据地区或等级查询医院
export const reqHospitalLevelOrRegin = (dictCode: string) => {
  return request2.get<any, HospitalLevelOrReginResponseData>(
    API.HOSPITAL_LEVEL_URL + dictCode
  );
};
//根据关键字获取医院的数据
export const reqHospitalInfo = (hosname: string) => {
  return request2.get<any, HospitalInfo>(API.HOSPITALINFO_URL + hosname);
};
