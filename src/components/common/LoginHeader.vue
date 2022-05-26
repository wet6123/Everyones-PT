<template>
  <v-app>
    <div>
      <v-app-bar app flat>
        <a href="/" class="ssafit"> &nbsp;SSAFIT &nbsp; </a>
        <v-spacer></v-spacer>
        <!-- 다크 모드-->
        <div>
          <v-tooltip v-if="!$vuetify.theme.dark" bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="darkMode">
                <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode On</span>
          </v-tooltip>

          <v-tooltip v-else bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="info" small fab @click="darkMode">
                <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
              </v-btn>
            </template>
            <span>Dark Mode Off</span>
          </v-tooltip>
        </div>
        <!-- ㅇㅇ님 안녕하세요 메시지 -->
        <h6 class="mt-3 message" style="margin: 10px 20px">
          {{ userinfo.nickname }}님 안녕하세요
          <b-icon
            icon="star-fill"
            animation="fade"
            font-scale="1"
            style="margin-left: 10px"
          ></b-icon>
        </h6>
        <!-- 유저 메뉴 -->
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <!-- 유저 메뉴 버튼 -->
            <v-btn icon v-bind="attrs" v-on="on" class="userMenu">
              <img
                style="border: 2px solid; border-radius: 70%"
                :src="require(`@/assets/images/${userinfo.profile}.png`)"
                width="40px"
              />
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(link, idx) in links3"
              :key="idx + 'A'"
              :to="{ path: link.router }"
              class="router"
              link
            >
              <v-list-item-title
                ><img :src="`${link.icon}`" style="width: 30px" />
                {{ link.title }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="userLogout" class="router" link>
              <v-list-item-title
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFW0lEQVRoge2Yf4hUVRTHP+fte8+11U0zSyj7QyHy118WpFJJSJv+YcKy7YybqSBCppgJKaEkYpFBaGAKFrmyujvruLWYmEIQYWQR/WGYFJVRilG2hr/XuTPv9MesOe/OvJ0fO2J/7Pe/e86553zPfTPnnntgEIMYxCBuJ6RUQ6WlHj+YSxDMQ2QiMBZwgL8QTqD6KcZJCB1/9u+naQyeG0N0Fsok4B4gAE6jehLH6SblHBD2XqxKAspSD+/Si6DrgFFFzK+DtmKcdULH3xbx0Xg1rwMLAb+Inx6QTZjh7wo7TcUJ9AXtAh4rEtDGOZRGSSeOAqj77OOIsx8YXaafo5hMo5A8F2UQmUAf+WPA+DKD3kAKYTGooPIBxU89Cr9gMtOiknAKCZUmv+/kbfI9KBtAp2K8YZgrdYhOQWUNylnL1kdpRWVXHnnlLKqvIDIZc6UOkxkOOhWRjcB5y894vJoupangART8AurFXwLdYlkeJOU8L7T/UzjpRbX4vWtR1hNxMECAspF07Wahtbewn6a78J02VOZYVFeJ6dhaNAGlpR4vc4rcP6xwkFRmnpDMRBC7ud+PN6KaAFxLlUa0WVKdHxb1QVMNvnPASqIHUzPOrk75J+UHcwlXm57syRcnDyCpji5EFpMtjTcQILK4FPIAQjJDKlgA5H7tUX3cQshPIAjmWd62Rf1sIgmkOvaArMiRrMjKyvBB8jzCtn65kf+ZQZzJoDfX6nSXE/g/N6Zju7rN9QCSTmyvxAeq3SDrw9zCyE8AvS+0NObnioIDku58s9K92djXfsK7I0dgcaNwtbCTKum3f2twZ2AJ8vgWSiB8YfhOpRfZwOGn7dh5l1l+AsLx0DrgqaqSKgdB0BBaq35nmxSoQnweWoss0TK61mpBQRBZYnH5zLbLT8DNdBEqQ0zAjc+qNsGicOMNwIM5kqCPWwh5CUhv8ldEPwkLdYuy1Ks6yQgoM10keMsSHpRryd9t28I9S+BsIvwVJuFdWFZNkv3CHbMaZEqORBHeKGQa3U57sTbguRxRL+ijYjqPR+2pBtSLPQx8AQzJEbeKSSwuZB/VNYLHGuByjqQWnHZlQV01iBaCsmgE0EmY/EWM+2rUnsgE5GriLMgqK8RE/NQ+ZWaBG3xgyD5dryeBcZZqpbDnj6h90V8AENPxPtAWjiRz8O7dUSnRQlA2OHiXdoHa1a5VTKK1v739JgCA8V4Avg8LZYm6sdfK5FkQCoL3wzbQFkt1AuMtL7a/pAtKhzY9gKn5EsFuppaKSbxXKtk8vyB48S2gKy3FGTymy7XE6WI+Sp8L+fFJqB4FRuaIA0QWltvrZzkieM3vhN8NAFwAfaLUaldWi6DuszMQ5xBQnyPOIDJfUh37SvbDTBdvzG5gvqW6APq0mM6vSvVVdo+jbnwaoocJJ2GA5WISO4vuZ9EI/N52lNmW6gLQICbxdTl8KmrS1Gt+BOQQcLel2YqZsFrYYPfxWe3Q2FjSchh0oqU6B85sMe3flsul4i5ThzSPJ5Aj2LMj1W7SV1uEj6+GxH7TRLTmMNmZai5+w8k0yPXkj5XwGFCbrENb7icdHClwoscwmWduTNPUjT+J6H7CBQCQk7hOg1zbe6ZSDgPu85X5I/GCg8B0S3UKJzOHoGYGsIP80eI3GJljD4HLRVUeKsqCOvxUFyoNluoyMCw/qh4h5TcKbVcGGrtqL63sPNXdDRorYvgR6dr5UaPFclHVp2L2coq9DayKMNmBeWh5VJWqBLfkratubA1CeCYkbJZUYu2tiHdLoF58mXqxjHqxQN3ml283n4qgfjyufjx+u3kMYhCD+B/jX0Rgy6CycqD8AAAAAElFTkSuQmCC"
                  style="width: 30px"
                />
                로그아웃</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- 반응형 : 햄버거 버튼 -->
        <div>
          <button @click="hamburgerMenu">
            <font-awesome-icon icon="fa-solid fa-bars" class="hamburger" />
          </button>
        </div>
      </v-app-bar>

      <v-main class="main">
        <v-row class="main-divider">
          <!-- 좌측 메뉴 -->
          <!-- 홈, 검색, 찜리스트, 시청기록 나타내는 왼쪽 메뉴바 -->
          <div :class="[{ leftMenu: true }, { hide: isClosed }]">
            <!-- 좌측 메뉴 안쪽 -->
            <v-sheet rounded="lg" class="leftBar">
              <v-list color="transparent">
                <v-list-item
                  v-for="(link, idx) in links"
                  :key="idx + 'I'"
                  :to="{ path: link.router }"
                  class="router"
                  link
                >
                  <v-list-item-icon>
                    <img :src="`${link.icon}`" style="width: 40px" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ link.title }}
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  v-for="(link, idx) in links2"
                  :key="idx + 'R'"
                  :to="{ path: link.router }"
                  class="router"
                  link
                >
                  <v-list-item-icon>
                    <img :src="`${link.icon}`" style="width: 40px" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    {{ link.title }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </div>

          <!-- 컨텐츠 표시 오른쪽 메인 공간 -->
          <div :class="[{ rightMain: true }, { paddingRightMain: !isClosed }]">
            <v-sheet min-height="100vh" rounded="lg">
              <router-view />
            </v-sheet>
          </div>
        </v-row>
      </v-main>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    toggle_val: [],
    isClosed: true,
    links: [
      {
        title: "홈",
        router: "/",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABiklEQVRIie2TPyjEYRjHP8/9fu+bUhaDwWQgi8mCkdSxGa77l4HBKhmsNrvRQBHdRZmE4ka3yGKj2BRlkcTv7e4xOAq/c7/zZxDf8en7fL7vU98X/pTUT0+rn56uZ0cigUGwqTmUmcpoHtc5JcyWvxygJCzGWwIyQFAZW2ANVxoT1oPq2zUClNFGrNtAiQO3qCSAANFNoAko4LwRYfWm7gAl3YLRLaAbuAQdFpc/AlCb7aJc2kZoBT3GSFzucheRA7Qh0UbJ2wXagTNisbg8rJ2GeHaADuCcmMblIX/ylhV7BzeZbkpesQI/xJnet3AAuV8/x9k+oAi0UZYDNcmeDwPUT/dDuQC0APs4b0BYuQq78un85WucGUTYBppB9tRLDr32PMNtMovKIk8NAddkhQVXDf7qYUwYzM1zmwJExyXIr75coCY5icryCxyICg/xWlRW1E/NhJrVpFRNSqPCa+35UZfD5uJyNT/quxZ9t+oKEJeTKK/+dMBn9PsDqrYoSlWjeH78gn/V1CN1Qoo7YXq3TgAAAABJRU5ErkJggg==",
      },
      {
        title: "검색",
        router: "/search",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEq0lEQVRoge2ZXYgVZRjHf8+cObNKZuCNSJldSAheeCEEQumGiW0fqMXumUWJ7kJq68awi6K1rsybCgnBG4N0z+5KsoqullTalRbRjZUXSqWFVLJIC+2ZM2eeLs7Jzjtn5jjvnKNu5O9unnnf//P8mXfejxm4wx1uCtJJZ2XLIorhE8AaYDmwBJjfuH0N+AnkHOgpqrVjwviVzspNJ5cRdf1eHLahPA4UMnYLEY4TRbskHDudJ287rIxoT/9S1NmNyvoOs04iOiSV0Qsd6RiSGdFi6TmQD4C7upR7GpGtEox81A2xTEbU899CeSPl9veITBDpSQq1y1TmXAbACxcT6b04rEPZACxLqWCHBOXhPMWbMjdAPf9tlNcTbp1Fo9ckHPs8SyJ1B1ch+g7wcEIVHZtpa6QxnD6MhQNgiGp5r4DaJFMQiv4LwHuAZ1aiWyQY3W+jZ3RPTdrTv5So8C3mO3EVZZOE5S/zJgRQd2A14hwCFjSFpyk4K2TmwMU8mk56Nmc3pomgGyYAJBw7jcozQLUpPI8oej+vZqIRdf3ehCl2qBsm/kHCkVOgr5iJeVJd/5E8eslPxGFbLHKGanlvngRtqY7uAb4yg/pqHqkWI8qWRSjm01DZbvtiZ0FA0Wi7GZQ+ZXChrVbrE6nvndwm5e/qw+DmUJ++5XxTyKWofbY6SUNrjZmJw7ai1kg0EYv02kokGVluXEV60lbUmsiJ51ie2K4NSUaWGFcFvWQrak0h/LltDRlIMnK3cVWJfrUVtabCL7HI/MR2bUhfEP/N0tHhKxtevI5qYrM2JBn507jqmbvIVtSaniCe43dbiSQjPxpXNVlsK2pNzb0/FvnNViLBiJyLtVhnK2pNa45v7CVaUPM8XT8U3VxUzRzCZ7YSrUaqtaNA2BRZpq5vvUBlRV1/LfBgcwUE8oWtTosRYfwKwvFYcKd2+OkoCQVB2BmrYEwY+cNWK3n6jaJdschDjZNddymWXgRWmkF9N49U+gnR84+hNG/eqmj0WLe+Sak78CjinACKTeWMS3VkII9e+oIoOgRMN0WKiHNI3cE1aV2yoq7fizgHMUwwRTV8Oa9mqhGpjF5AZGssvADRT7VY2prnnVEQLZZeQvgE87wO8ANMT9lqXq/3hsk9fxjlzYRbX6OyXcKRTFOluv7axou9MrWR6AmCuRuFfTNZNI2umYpINwPIeSSaIHJO4nCJIGx8oHPvI2Jx/QOdbsCcYttVNElwbZMwWcnU/nq3jKhX2ozKHmCeTYJc5DCTYffb0A5G91NwViAczVfddRTlYOM9SWvRh3fPIaWvJ6toZiMAMnPgogTlp1BWo3oEcwdwIyrAGLBKwnI/wZwNLQtvM5ZmOvzRM7iw8aGgl/rx9AHqh6IaylWEK6BngTNUC0eEA1Nm/+fn4M18HFuv4hVmGma34NDUHqXfw3UOIvJ0aqMMs9ltNwLdMTMrjEDnZmaNEejMzKwyAvnNWE2/twJhPCCcO4AwmdpIZT3eX882h2adEQBh3wxBbWNjrWpFGY7/3Zp1Q6uZxGGmDEtY3nEby8qH0u+pWzqsRV/V9VM2rv8RlL4e9Uqbb3cdd/hf8jeAYplH7o286AAAAABJRU5ErkJggg==",
      },
    ],
    links2: [
      {
        title: "찜리스트",
        router: "/vlist/like",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFW0lEQVRoge2Yf4hUVRTHP+fte8+11U0zSyj7QyHy118WpFJJSJv+YcKy7YybqSBCppgJKaEkYpFBaGAKFrmyujvruLWYmEIQYWQR/WGYFJVRilG2hr/XuTPv9MesOe/OvJ0fO2J/7Pe/e86553zPfTPnnntgEIMYxCBuJ6RUQ6WlHj+YSxDMQ2QiMBZwgL8QTqD6KcZJCB1/9u+naQyeG0N0Fsok4B4gAE6jehLH6SblHBD2XqxKAspSD+/Si6DrgFFFzK+DtmKcdULH3xbx0Xg1rwMLAb+Inx6QTZjh7wo7TcUJ9AXtAh4rEtDGOZRGSSeOAqj77OOIsx8YXaafo5hMo5A8F2UQmUAf+WPA+DKD3kAKYTGooPIBxU89Cr9gMtOiknAKCZUmv+/kbfI9KBtAp2K8YZgrdYhOQWUNylnL1kdpRWVXHnnlLKqvIDIZc6UOkxkOOhWRjcB5y894vJoupangART8AurFXwLdYlkeJOU8L7T/UzjpRbX4vWtR1hNxMECAspF07Wahtbewn6a78J02VOZYVFeJ6dhaNAGlpR4vc4rcP6xwkFRmnpDMRBC7ud+PN6KaAFxLlUa0WVKdHxb1QVMNvnPASqIHUzPOrk75J+UHcwlXm57syRcnDyCpji5EFpMtjTcQILK4FPIAQjJDKlgA5H7tUX3cQshPIAjmWd62Rf1sIgmkOvaArMiRrMjKyvBB8jzCtn65kf+ZQZzJoDfX6nSXE/g/N6Zju7rN9QCSTmyvxAeq3SDrw9zCyE8AvS+0NObnioIDku58s9K92djXfsK7I0dgcaNwtbCTKum3f2twZ2AJ8vgWSiB8YfhOpRfZwOGn7dh5l1l+AsLx0DrgqaqSKgdB0BBaq35nmxSoQnweWoss0TK61mpBQRBZYnH5zLbLT8DNdBEqQ0zAjc+qNsGicOMNwIM5kqCPWwh5CUhv8ldEPwkLdYuy1Ks6yQgoM10keMsSHpRryd9t28I9S+BsIvwVJuFdWFZNkv3CHbMaZEqORBHeKGQa3U57sTbguRxRL+ijYjqPR+2pBtSLPQx8AQzJEbeKSSwuZB/VNYLHGuByjqQWnHZlQV01iBaCsmgE0EmY/EWM+2rUnsgE5GriLMgqK8RE/NQ+ZWaBG3xgyD5dryeBcZZqpbDnj6h90V8AENPxPtAWjiRz8O7dUSnRQlA2OHiXdoHa1a5VTKK1v739JgCA8V4Avg8LZYm6sdfK5FkQCoL3wzbQFkt1AuMtL7a/pAtKhzY9gKn5EsFuppaKSbxXKtk8vyB48S2gKy3FGTymy7XE6WI+Sp8L+fFJqB4FRuaIA0QWltvrZzkieM3vhN8NAFwAfaLUaldWi6DuszMQ5xBQnyPOIDJfUh37SvbDTBdvzG5gvqW6APq0mM6vSvVVdo+jbnwaoocJJ2GA5WISO4vuZ9EI/N52lNmW6gLQICbxdTl8KmrS1Gt+BOQQcLel2YqZsFrYYPfxWe3Q2FjSchh0oqU6B85sMe3flsul4i5ThzSPJ5Aj2LMj1W7SV1uEj6+GxH7TRLTmMNmZai5+w8k0yPXkj5XwGFCbrENb7icdHClwoscwmWduTNPUjT+J6H7CBQCQk7hOg1zbe6ZSDgPu85X5I/GCg8B0S3UKJzOHoGYGsIP80eI3GJljD4HLRVUeKsqCOvxUFyoNluoyMCw/qh4h5TcKbVcGGrtqL63sPNXdDRorYvgR6dr5UaPFclHVp2L2coq9DayKMNmBeWh5VJWqBLfkratubA1CeCYkbJZUYu2tiHdLoF58mXqxjHqxQN3ml283n4qgfjyufjx+u3kMYhCD+B/jX0Rgy6CycqD8AAAAAElFTkSuQmCC",
      },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEq0lEQVRoge2ZXYgVZRjHf8+cObNKZuCNSJldSAheeCEEQumGiW0fqMXumUWJ7kJq68awi6K1rsybCgnBG4N0z+5KsoqullTalRbRjZUXSqWFVLJIC+2ZM2eeLs7Jzjtn5jjvnKNu5O9unnnf//P8mXfejxm4wx1uCtJJZ2XLIorhE8AaYDmwBJjfuH0N+AnkHOgpqrVjwviVzspNJ5cRdf1eHLahPA4UMnYLEY4TRbskHDudJ287rIxoT/9S1NmNyvoOs04iOiSV0Qsd6RiSGdFi6TmQD4C7upR7GpGtEox81A2xTEbU899CeSPl9veITBDpSQq1y1TmXAbACxcT6b04rEPZACxLqWCHBOXhPMWbMjdAPf9tlNcTbp1Fo9ckHPs8SyJ1B1ch+g7wcEIVHZtpa6QxnD6MhQNgiGp5r4DaJFMQiv4LwHuAZ1aiWyQY3W+jZ3RPTdrTv5So8C3mO3EVZZOE5S/zJgRQd2A14hwCFjSFpyk4K2TmwMU8mk56Nmc3pomgGyYAJBw7jcozQLUpPI8oej+vZqIRdf3ehCl2qBsm/kHCkVOgr5iJeVJd/5E8eslPxGFbLHKGanlvngRtqY7uAb4yg/pqHqkWI8qWRSjm01DZbvtiZ0FA0Wi7GZQ+ZXChrVbrE6nvndwm5e/qw+DmUJ++5XxTyKWofbY6SUNrjZmJw7ai1kg0EYv02kokGVluXEV60lbUmsiJ51ie2K4NSUaWGFcFvWQrak0h/LltDRlIMnK3cVWJfrUVtabCL7HI/MR2bUhfEP/N0tHhKxtevI5qYrM2JBn507jqmbvIVtSaniCe43dbiSQjPxpXNVlsK2pNzb0/FvnNViLBiJyLtVhnK2pNa45v7CVaUPM8XT8U3VxUzRzCZ7YSrUaqtaNA2BRZpq5vvUBlRV1/LfBgcwUE8oWtTosRYfwKwvFYcKd2+OkoCQVB2BmrYEwY+cNWK3n6jaJdschDjZNddymWXgRWmkF9N49U+gnR84+hNG/eqmj0WLe+Sak78CjinACKTeWMS3VkII9e+oIoOgRMN0WKiHNI3cE1aV2yoq7fizgHMUwwRTV8Oa9mqhGpjF5AZGssvADRT7VY2prnnVEQLZZeQvgE87wO8ANMT9lqXq/3hsk9fxjlzYRbX6OyXcKRTFOluv7axou9MrWR6AmCuRuFfTNZNI2umYpINwPIeSSaIHJO4nCJIGx8oHPvI2Jx/QOdbsCcYttVNElwbZMwWcnU/nq3jKhX2ozKHmCeTYJc5DCTYffb0A5G91NwViAczVfddRTlYOM9SWvRh3fPIaWvJ6toZiMAMnPgogTlp1BWo3oEcwdwIyrAGLBKwnI/wZwNLQtvM5ZmOvzRM7iw8aGgl/rx9AHqh6IaylWEK6BngTNUC0eEA1Nm/+fn4M18HFuv4hVmGma34NDUHqXfw3UOIvJ0aqMMs9ltNwLdMTMrjEDnZmaNEejMzKwyAvnNWE2/twJhPCCcO4AwmdpIZT3eX882h2adEQBh3wxBbWNjrWpFGY7/3Zp1Q6uZxGGmDEtY3nEby8qH0u+pWzqsRV/V9VM2rv8RlL4e9Uqbb3cdd/hf8jeAYplH7o286AAAAABJRU5ErkJggg==",
      },
    ],
    links3: [
      {
        title: "프로필 편집",
        router: "/member/check",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABiklEQVRIie2TPyjEYRjHP8/9fu+bUhaDwWQgi8mCkdSxGa77l4HBKhmsNrvRQBHdRZmE4ka3yGKj2BRlkcTv7e4xOAq/c7/zZxDf8en7fL7vU98X/pTUT0+rn56uZ0cigUGwqTmUmcpoHtc5JcyWvxygJCzGWwIyQFAZW2ANVxoT1oPq2zUClNFGrNtAiQO3qCSAANFNoAko4LwRYfWm7gAl3YLRLaAbuAQdFpc/AlCb7aJc2kZoBT3GSFzucheRA7Qh0UbJ2wXagTNisbg8rJ2GeHaADuCcmMblIX/ylhV7BzeZbkpesQI/xJnet3AAuV8/x9k+oAi0UZYDNcmeDwPUT/dDuQC0APs4b0BYuQq78un85WucGUTYBppB9tRLDr32PMNtMovKIk8NAddkhQVXDf7qYUwYzM1zmwJExyXIr75coCY5icryCxyICg/xWlRW1E/NhJrVpFRNSqPCa+35UZfD5uJyNT/quxZ9t+oKEJeTKK/+dMBn9PsDqrYoSlWjeH78gn/V1CN1Qoo7YXq3TgAAAABJRU5ErkJggg==",
      },
      {
        title: "찜리스트",
        router: "/vlist/like",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFW0lEQVRoge2Yf4hUVRTHP+fte8+11U0zSyj7QyHy118WpFJJSJv+YcKy7YybqSBCppgJKaEkYpFBaGAKFrmyujvruLWYmEIQYWQR/WGYFJVRilG2hr/XuTPv9MesOe/OvJ0fO2J/7Pe/e86553zPfTPnnntgEIMYxCBuJ6RUQ6WlHj+YSxDMQ2QiMBZwgL8QTqD6KcZJCB1/9u+naQyeG0N0Fsok4B4gAE6jehLH6SblHBD2XqxKAspSD+/Si6DrgFFFzK+DtmKcdULH3xbx0Xg1rwMLAb+Inx6QTZjh7wo7TcUJ9AXtAh4rEtDGOZRGSSeOAqj77OOIsx8YXaafo5hMo5A8F2UQmUAf+WPA+DKD3kAKYTGooPIBxU89Cr9gMtOiknAKCZUmv+/kbfI9KBtAp2K8YZgrdYhOQWUNylnL1kdpRWVXHnnlLKqvIDIZc6UOkxkOOhWRjcB5y894vJoupangART8AurFXwLdYlkeJOU8L7T/UzjpRbX4vWtR1hNxMECAspF07Wahtbewn6a78J02VOZYVFeJ6dhaNAGlpR4vc4rcP6xwkFRmnpDMRBC7ud+PN6KaAFxLlUa0WVKdHxb1QVMNvnPASqIHUzPOrk75J+UHcwlXm57syRcnDyCpji5EFpMtjTcQILK4FPIAQjJDKlgA5H7tUX3cQshPIAjmWd62Rf1sIgmkOvaArMiRrMjKyvBB8jzCtn65kf+ZQZzJoDfX6nSXE/g/N6Zju7rN9QCSTmyvxAeq3SDrw9zCyE8AvS+0NObnioIDku58s9K92djXfsK7I0dgcaNwtbCTKum3f2twZ2AJ8vgWSiB8YfhOpRfZwOGn7dh5l1l+AsLx0DrgqaqSKgdB0BBaq35nmxSoQnweWoss0TK61mpBQRBZYnH5zLbLT8DNdBEqQ0zAjc+qNsGicOMNwIM5kqCPWwh5CUhv8ldEPwkLdYuy1Ks6yQgoM10keMsSHpRryd9t28I9S+BsIvwVJuFdWFZNkv3CHbMaZEqORBHeKGQa3U57sTbguRxRL+ijYjqPR+2pBtSLPQx8AQzJEbeKSSwuZB/VNYLHGuByjqQWnHZlQV01iBaCsmgE0EmY/EWM+2rUnsgE5GriLMgqK8RE/NQ+ZWaBG3xgyD5dryeBcZZqpbDnj6h90V8AENPxPtAWjiRz8O7dUSnRQlA2OHiXdoHa1a5VTKK1v739JgCA8V4Avg8LZYm6sdfK5FkQCoL3wzbQFkt1AuMtL7a/pAtKhzY9gKn5EsFuppaKSbxXKtk8vyB48S2gKy3FGTymy7XE6WI+Sp8L+fFJqB4FRuaIA0QWltvrZzkieM3vhN8NAFwAfaLUaldWi6DuszMQ5xBQnyPOIDJfUh37SvbDTBdvzG5gvqW6APq0mM6vSvVVdo+jbnwaoocJJ2GA5WISO4vuZ9EI/N52lNmW6gLQICbxdTl8KmrS1Gt+BOQQcLel2YqZsFrYYPfxWe3Q2FjSchh0oqU6B85sMe3flsul4i5ThzSPJ5Aj2LMj1W7SV1uEj6+GxH7TRLTmMNmZai5+w8k0yPXkj5XwGFCbrENb7icdHClwoscwmWduTNPUjT+J6H7CBQCQk7hOg1zbe6ZSDgPu85X5I/GCg8B0S3UKJzOHoGYGsIP80eI3GJljD4HLRVUeKsqCOvxUFyoNluoyMCw/qh4h5TcKbVcGGrtqL63sPNXdDRorYvgR6dr5UaPFclHVp2L2coq9DayKMNmBeWh5VJWqBLfkratubA1CeCYkbJZUYu2tiHdLoF58mXqxjHqxQN3ml283n4qgfjyufjx+u3kMYhCD+B/jX0Rgy6CycqD8AAAAAElFTkSuQmCC",
      },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEq0lEQVRoge2ZXYgVZRjHf8+cObNKZuCNSJldSAheeCEEQumGiW0fqMXumUWJ7kJq68awi6K1rsybCgnBG4N0z+5KsoqullTalRbRjZUXSqWFVLJIC+2ZM2eeLs7Jzjtn5jjvnKNu5O9unnnf//P8mXfejxm4wx1uCtJJZ2XLIorhE8AaYDmwBJjfuH0N+AnkHOgpqrVjwviVzspNJ5cRdf1eHLahPA4UMnYLEY4TRbskHDudJ287rIxoT/9S1NmNyvoOs04iOiSV0Qsd6RiSGdFi6TmQD4C7upR7GpGtEox81A2xTEbU899CeSPl9veITBDpSQq1y1TmXAbACxcT6b04rEPZACxLqWCHBOXhPMWbMjdAPf9tlNcTbp1Fo9ckHPs8SyJ1B1ch+g7wcEIVHZtpa6QxnD6MhQNgiGp5r4DaJFMQiv4LwHuAZ1aiWyQY3W+jZ3RPTdrTv5So8C3mO3EVZZOE5S/zJgRQd2A14hwCFjSFpyk4K2TmwMU8mk56Nmc3pomgGyYAJBw7jcozQLUpPI8oej+vZqIRdf3ehCl2qBsm/kHCkVOgr5iJeVJd/5E8eslPxGFbLHKGanlvngRtqY7uAb4yg/pqHqkWI8qWRSjm01DZbvtiZ0FA0Wi7GZQ+ZXChrVbrE6nvndwm5e/qw+DmUJ++5XxTyKWofbY6SUNrjZmJw7ai1kg0EYv02kokGVluXEV60lbUmsiJ51ie2K4NSUaWGFcFvWQrak0h/LltDRlIMnK3cVWJfrUVtabCL7HI/MR2bUhfEP/N0tHhKxtevI5qYrM2JBn507jqmbvIVtSaniCe43dbiSQjPxpXNVlsK2pNzb0/FvnNViLBiJyLtVhnK2pNa45v7CVaUPM8XT8U3VxUzRzCZ7YSrUaqtaNA2BRZpq5vvUBlRV1/LfBgcwUE8oWtTosRYfwKwvFYcKd2+OkoCQVB2BmrYEwY+cNWK3n6jaJdschDjZNddymWXgRWmkF9N49U+gnR84+hNG/eqmj0WLe+Sak78CjinACKTeWMS3VkII9e+oIoOgRMN0WKiHNI3cE1aV2yoq7fizgHMUwwRTV8Oa9mqhGpjF5AZGssvADRT7VY2prnnVEQLZZeQvgE87wO8ANMT9lqXq/3hsk9fxjlzYRbX6OyXcKRTFOluv7axou9MrWR6AmCuRuFfTNZNI2umYpINwPIeSSaIHJO4nCJIGx8oHPvI2Jx/QOdbsCcYttVNElwbZMwWcnU/nq3jKhX2ozKHmCeTYJc5DCTYffb0A5G91NwViAczVfddRTlYOM9SWvRh3fPIaWvJ6toZiMAMnPgogTlp1BWo3oEcwdwIyrAGLBKwnI/wZwNLQtvM5ZmOvzRM7iw8aGgl/rx9AHqh6IaylWEK6BngTNUC0eEA1Nm/+fn4M18HFuv4hVmGma34NDUHqXfw3UOIvJ0aqMMs9ltNwLdMTMrjEDnZmaNEejMzKwyAvnNWE2/twJhPCCcO4AwmdpIZT3eX882h2adEQBh3wxBbWNjrWpFGY7/3Zp1Q6uZxGGmDEtY3nEby8qH0u+pWzqsRV/V9VM2rv8RlL4e9Uqbb3cdd/hf8jeAYplH7o286AAAAABJRU5ErkJggg==",
      },
    ],
  }),
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    userLogout() {
      this.$store.commit("USER_LOGOUT");
      this.$router.push({ name: "main" });
    },
    hamburgerMenu() {
      this.isClosed = !this.isClosed;
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
<style scoped>
/* 홈, 검색, 찜리스트, 시청기록 나타내는 왼쪽 메뉴바 */
.leftMenu {
  position: fixed;
  width: 200px;
}
/* 컨텐츠 표시 오른쪽 메인 공간 */
.rightMain {
  margin-left: 200px;
  width: 100%;
}
.leftBar {
  width: 180px;
}
.header {
  display: flex;
  justify-content: space-between;
}
/* .main {
  background-color: grey;
} */
.main-divider {
  margin: 20px;
}

a:hover {
  text-decoration: none;
}

.ssafit {
  /* background-image: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    navy,
    purple
  );
  -webkit-background-clip: text;
  color: transparent; */
  color: rgb(248, 47, 98);

  font-weight: bold;
  font-size: 40px;

  font-size: 25px;
}
.router {
  color: black;
  text-decoration: none;
}
.login {
  color: white;
  font-size: 20px;
}
.run:hover {
  transform: translateX(300px) scale(0.8, 1);
  transition-duration: 2s;
}

/* 햄버거 버튼 숨겨 */
.hamburger {
  display: none;
}

@media screen and (max-width: 768px) {
  .main {
    background-color: rgb(84, 84, 84);
  }
  /* 위는 삭제 */
  .main * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    display: block;
    width: auto;
    height: auto;
  }
  .leftMenu {
    visibility: visible;
    opacity: 1;
    position: fixed;
    z-index: 2;
    margin: 0px;
    width: 100%;
    height: 200px;
    transition: all 0.3s;
  }

  .leftBar {
    border-radius: 0px !important;
    width: 100%;
  }
  .main-divider {
    flex-direction: column;
  }
  /* 상단 이미지 & 인사문구 가리기 */
  .run {
    display: none;
  }
  .message {
    display: none;
  }
  /* 햄버거 버튼 나오고 회원 버튼 사라짐 */
  .userMenu {
    display: none;
  }
  .hamburger {
    display: block;
    font-size: 25px;
    margin-left: 20px;
  }
  .hide {
    visibility: hidden;
    opacity: 0;
    height: 0px;
  }
  .paddingRightMain {
    padding-top: 200px;
    transition: all 0.2s;
  }
  .rounded-lg {
    border-radius: 0 !important;
  }
  .v-application .rounded-lg {
    border-radius: 0px !important;
  }
  .v-list > a * {
    display: inline-block;
    vertical-align: middle;
  }
  .v-list > a {
    text-align: center;
  }
}
</style>
