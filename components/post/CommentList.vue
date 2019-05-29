<template>
  <div class="comment-lsit">
    <Comment
      @like="handleLike"
      @reply="handleReply(item._id)"
      v-for="item in comments"
      :key="item._id"
      v-bind="item"
    >
      <EditInput slot="edit" :isyes="show_id == item._id" @blur="handleReply(null)"/>

      <Comment
        slot="comment"
        @like="handleLike"
        @reply="handleReply(_item._id)"
        v-for="_item in item.two_comments"
        :key="_item._id"
        v-bind="_item"
      >
        <EditInput slot="edit" :isyes="show_id == _item._id" @blur="handleReply(null)"/>
      </Comment>
    </Comment>
  </div>
</template>

<script>
import Comment from "@/components/common/listItem/CommentItem";
import EditInput from "@/components/post/EditInput";
export default {
  props: {
    comments: Array
  },
  components: {
    Comment,
    EditInput
  },
  data() {
    return {
      show_id: null
    };
  },
  mounted() {
    console.log(this.comments);
  },
  methods: {
    handleLike() {
      console.log("handleLike");
    },
    handleReply(id) {
      this.show_id = id;
    }
  }
};
</script>


<style lang="scss" scoped>
.comment-lsit {
  padding-left: 50px;
  margin-top: 15px;
}
</style>
