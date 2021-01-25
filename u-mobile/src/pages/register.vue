<template>
  <div>
    <com-title />
    <van-form @submit="register">
      <van-field
        v-model="form.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="form.nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
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
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import { register } from "@/utils";
export default {
  data() {
    return {
      form: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      // console.log(this.form);
      const res = await register(this.form).catch((err) => console.log(err));
      // console.log(res);
      if (res.code === 200) {
        Toast.success(res.msg);
        this.$router.push("/login");
      } else {
        Toast.fail(res.msg);
      }
    },
  },
};
</script>

<style lang='' scoped>
.van-form {
  margin-top: 30%;
}
</style>