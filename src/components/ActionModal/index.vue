<script setup lang="ts">
import FontAwesomeIcon from '@/plugins/fa.config'
import Divider from '@/components/Divider/index.vue'

</script>

<template>
    <main class="modal-wrapper">
        <div class="modal-wrapper__header-1">
            <span title="teste" class="modal-wrapper__header-1 task__title">Task: sadihasiodhasoidhwquiehquihquiwehwquidhuisadhasiu</span>
            <div class="modal-wrapper__header-1 task__icon-close">
                <font-awesome-icon icon="fa-xmark"/>
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-2">
            <span class="modal-wrapper__header-2 flags__title">Priority</span>
            <div class="modal-wrapper__header-2 flags__icons">
                <div class="modal-wrapper__header-2 flags__icons--icon">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="deeppink" />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="orange" />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="yellow" />
                </div>
                <div class="modal-wrapper__header-2 flags__icons--icon">
                    <font-awesome-icon icon="fa-flag" width="12" height="12" color="black" />
                </div>
            </div>
        </div>  
        <Divider />
        <div class="modal-wrapper__header-3">
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option">Move up</span> 
            </div>
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option">Move up</span>    
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-3">
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option">Show description</span> 
            </div>
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option">Duplicate</span>    
            </div>
        </div>
        <Divider />
        <div class="modal-wrapper__header-3">
            <div class="modal-wrapper__header-3 action">
                <span class="modal-wrapper__header-3 action--option delete">Delete task</span> 
            </div>
        </div>
    </main>
</template>

<style lang="scss" src="./styles.scss">
</style>