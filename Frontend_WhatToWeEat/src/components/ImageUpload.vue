<template>
  <n-upload
    ref="imgUploadRef"
    directory-dnd
    accept=".jpg, .jpeg, .png"
    :max="1"
    list-type="image"
    :on-before-upload="handleFileUpload"
  >
    <n-upload-dragger>
      <div class="flex items-center justify-center w-full h-14">
        <i-material-symbols:cloud-upload class="h-10 w-10" />
      </div>
      <n-text style="font-size: 16px">
        點擊或拖曳來上傳圖片
      </n-text>
      <n-p
        depth="3"
        style="margin: 8px 0 0 0"
      >
        檔案格式限制為JPG, JPEG, PNG且大小不超過3MB
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import { useMessage } from "naive-ui";
const message = useMessage();
const uploadImg = ref(new FormData());
const imgUploadRef = ref(null);
const emit = defineEmits(["upload"]);

function handleFileUpload(options) {
  let format = options.file.file.type;
  let sizeMb = options.file.file.size / 1024 / 1024;

  if (
    format != "image/png" &&
    format != "image/jpg" &&
    format != "image/jpeg"
  ) {
    message.warning("圖片格式錯誤，僅支持JPG, JPEG, PNG");
    imgUploadRef.value.clear();
    return false;
  }

  if (sizeMb > 3) {
    message.warning("圖片大小過大，請保持在3MB以下");
    imgUploadRef.value.clear();
    return false;
  }
  uploadImg.value.append("restImg", options.file.file);

  emit("upload", uploadImg);
}
</script>
<style></style>
