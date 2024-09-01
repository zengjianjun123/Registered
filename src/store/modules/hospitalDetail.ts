import { defineStore } from "pinia";
import { reqHospitalDetail, reqHospitalDepartment } from "@/api/hospital";
import type {
  HospitalDetailResponse,
  HospitalDetail,
  DepartmentResponse,
  DepartmentArr,
} from "@/api/hospital/type";
const useDetailStore = defineStore("Detail", {
  state: () => {
    return {
      //医院详情数据
      hospitalInfo: {} as HospitalDetail,
      //医院科室数据
      hospitalDepartmentInfo: [] as DepartmentArr,
    };
  },
  actions: {
    //获取医院详情的方法
    async getHospital(hoscode: any) {
      let res: HospitalDetailResponse = await reqHospitalDetail(hoscode);
      if (res.code === 200) {
        this.hospitalInfo = res.data;
      }
    },
    // 获取医院科室详情的方法
    async getHospitalDepartment(hoscode: any) {
      let res: DepartmentResponse = await reqHospitalDepartment(hoscode);
      if (res.code === 200) {
        this.hospitalDepartmentInfo = res.data;
      }
    },
  },
  getters: {},
});

export default useDetailStore;
