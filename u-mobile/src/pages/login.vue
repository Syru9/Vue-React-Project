<template>
  <div>
    <com-title />
    <van-form @submit="login">
      <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/utils";
import { Toast } from "vant";
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const res = await login(this.form).catch((err) => console.log(err));
      if (res.code === 200) {
        sessionStorage.setItem("userInfo", JSON.stringify(res.list));
        this.$router.push("/home");
        Toast.success(res.msg);
      } else {
        Toast.fail(res.msg);
      }
      console.log(res);
    },
  },
};
</script>

<style lang='' scoped>
.van-form{
  margin-top: 6rem;
}
</style>