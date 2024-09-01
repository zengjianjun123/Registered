import request from "@/utils/request";
import request2 from "@/utils/request2";
import type {
  HospitalDetailResponse,
  DepartmentResponse,
  UserLoginResponse,
  LoginData,
  WXLogin,
  WXLoginResponse,
  HospitalWorkDataResponse,
  DoctorResponse,
  UserResponse,
  DoctorInfoResponse,
} from "./type";

enum API {
  HOSPITAL_Detail_URL = "/hosp2/hospital/",
  //获取医院科室的数据
  HOSPITAL_Department_URL = "hosp/department/",
  //获取短信验证码
  GET_UserCode_URL = "/sms/send/",
  //用户登录
  USERLOGIN_URL = "/user/login",
  //获取微信扫码需要的参数
  WXLOGIN_URL = "/user/weixin/getLoginParam/",
  //获取某一个科室挂号数据
  HOSPITALWORK_URL = "/hosp/hospital/auth/getBookingScheduleRule/",
  //获取医院某科室某天的医生值班信息
  HOSPITAL_DOCTOR_URL = "/hosp/hospital/auth/findScheduleList/",
  //获取某一账号下的就诊人信息
  GET_USER_URL = "/user/patient/auth/findAll",
  //获取挂号医生的信息
  GET_DOCTOR_INFO_URL = "/hosp/hospital/getSchedule/",
}

//获得医院详情信息
export const reqHospitalDetail = (hoscode: string) => {
  return request2.get<any, HospitalDetailResponse>(
    API.HOSPITAL_Detail_URL + hoscode
  );
};

//获取医院科室的接口
export const reqHospitalDepartment = (hoscode: string) => {
  return request2.get<any, DepartmentResponse>(
    API.HOSPITAL_Department_URL + hoscode
  );
};

//获取手机验证码
export const reqIphoneCode = (iphone: string) => {
  return request2.get<any, any>(API.GET_UserCode_URL + iphone);
};

//用户登录
export const reqUserLogin = (data: LoginData) => {
  return request2.post<any, UserLoginResponse>(API.USERLOGIN_URL, data);
};

//获取微信扫码登录参数
export const reqWxLogin = (wxRedirectUri: string) => {
  return request.get<any, WXLoginResponse>(
    API.WXLOGIN_URL + `?wxRedirectUri=${wxRedirectUri}`
  );
};

//获取预约挂号的数据
export const reqHospitalWork = (
  page: number,
  limit: number,
  hosode: string,
  depcode: string
) => {
  return request.get<any, HospitalWorkDataResponse>(
    API.HOSPITALWORK_URL + `${page}/${limit}/${hosode}/${depcode}`
  );
};

//获取某科室某天医生值班信息
export const reqHospitalDoctor = (
  hoscode: string,
  depcode: string,
  workDate: string
) => {
  return request.get<any, DoctorResponse>(
    API.HOSPITAL_DOCTOR_URL + `${hoscode}/${depcode}/${workDate}`
  );
};

//获取账号下就诊人信息
export const reqGetUser = () => {
  return request.get<any, UserResponse>(API.GET_USER_URL);
};

//获取挂号医生的信息
export const reqGetDoctor = (docId: string) => {
  return request.get<any, DoctorInfoResponse>(API.GET_DOCTOR_INFO_URL + docId);
};
