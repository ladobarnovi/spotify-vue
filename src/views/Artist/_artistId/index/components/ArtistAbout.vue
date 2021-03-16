<template>
  <div class="artist-about">
    <div class="title">About</div>
    <div class="about-brief" @click="toggle">
      <div class="image-container"></div>
      <p class="listeners">29,394 monthly listeners</p>
      <p class="bio">
        "The Outer Ones" sees Revocation pushing both the death metal and
        progressive elements of their signature sound harder than ever. “I knew
        that I wanted to go in a darker direction, and this is our most death
        metal album to date,” states vocalist/guitarist Dave Davidson.
        “Sometimes when death metal bands go down the prog route they lose some
        of that edge, but we wanted to keep the aggression at the forefront of
        what we do while still pushing our boundaries.” Moving away from the
        societal and historical themes that informed 2016′s "Great is Our Sin"
        this time Davidson has immersed himself in the fantastic, evoking one of
        the great writers of the sci-fi/horror genre. “The title is my ode to
        H.P.
      </p>
    </div>

    <Modal v-show="active" @close="toggle">
      <header>
        <img src="/outerones.jpg" />
      </header>
      <main>
        <div class="left">
          <div class="followers">
            <p>34,567</p>
            <p>Followers</p>
          </div>
          <div class="listeners">
            <p>85,615</p>
            <p>Monthly Listeners</p>
          </div>
          <div class="per-city">
            <div>
              <p>Los Angeles, CA</p>
              <p>2,245 Listeners</p>
            </div>
            <div>
              <p>Mexico City, MX</p>
              <p>23,571 Listeners</p>
            </div>
            <div>
              <p>Paris, FR</p>
              <p>234 Listeners</p>
            </div>
          </div>
          <div class="media">
            <a class="fb">
              <img src="@/assets/icons/fb.svg" />
              <p>Facebook</p>
            </a>
            <a class="twitter">
              <img src="@/assets/icons/twitter.svg" />
              <p>Twitter</p>
            </a>
            <a class="ig">
              <img src="@/assets/icons/ig.svg" />
              <p>Instagram</p>
            </a>
          </div>
        </div>
        <div class="right">
          "The Outer Ones" sees Revocation pushing both the death metal and
          progressive elements of their signature sound harder than ever. “I
          knew that I wanted to go in a darker direction, and this is our most
          death metal album to date,” states vocalist/guitarist Dave Davidson.
          “Sometimes when death metal bands go down the prog route they lose
          some of that edge, but we wanted to keep the aggression at the
          forefront of what we do while still pushing our boundaries.” Moving
          away from the societal and historical themes that informed 2016′s
          "Great is Our Sin" this time Davidson has immersed himself in the
          fantastic, evoking one of the great writers of the sci-fi/horror
          genre. “The title is my ode to H.P. Lovecraft and the entities of pure
          cosmic horror that rule that universe he created. Since the new music
          we were writing was so evil and spacey in sections it seemed to be the
          right title to fit the overall vibe. But while the lyrical content is
          largely influenced by such writings, in every allegory there is of
          course some reflection of the real world, so I enjoy writing in a way
          that could have one overlaying meaning and then another deeper,
          symbolic meaning as well.”
        </div>
      </main>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useToggle } from "@/hooks/toggle";
import OverlayScrollbars from "overlayscrollbars";
import Modal from "@/components/Common/Modal.vue";

export default defineComponent({
  components: { Modal },
  setup() {
    const { active, toggle } = useToggle();

    onMounted(() => {
      OverlayScrollbars(document.getElementById("modal-body") as HTMLElement, {
        resize: "both"
      });
    });

    return {
      active,
      toggle
    };
  }
});
</script>

<style scoped lang="scss">
.artist-about {
  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.04em;
    margin-bottom: 16px;
  }

  .about-brief {
    padding: 40px;
    border-radius: 8px;
    height: 516px;
    background-color: #282828;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;

    .image-container {
      background-image: url("/outerones.jpg");
      background-position: center;
      background-size: cover;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      top: 0;
      left: 0;
      transition: transform 1s ease;
      opacity: 0.6;
    }

    .listeners {
      position: relative;
      z-index: 1;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: normal;
      margin-top: auto;
    }

    .bio {
      position: relative;
      z-index: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 8px;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: normal;
    }

    &:hover {
      .image-container {
        transform: scale(1.05);
      }
    }
  }

  .modal {
    header {
      height: 432px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    main {
      padding: 40px;
      display: flex;

      .left {
        .followers,
        .listeners {
          margin-bottom: 40px;

          & > :first-child {
            font-size: 32px;
            font-weight: 700;
            line-height: 36px;
            letter-spacing: -0.04em;
          }

          & > :last-child {
            font-size: 14px;
            font-weight: 400;
            line-height: 16px;
            letter-spacing: normal;
          }
        }

        .per-city {
          margin-bottom: 40px;

          div {
            & > :first-child {
              font-size: 14px;
              font-weight: 700;
              line-height: 16px;
              letter-spacing: normal;
              margin-bottom: 8px;
            }

            & > :last-child {
              font-size: 14px;
              font-weight: 400;
              line-height: 16px;
              letter-spacing: normal;
              color: #b3b3b3;
            }

            &:not(:last-child) {
              margin-bottom: 16px;
            }
          }
        }

        .media {
          a {
            display: flex;
            align-items: center;
            color: white;
            opacity: 0.7;
            cursor: pointer;

            img {
              width: 24px;
              height: 24px;
              margin-right: 4px;
            }

            &:hover {
              opacity: 1;

              p {
                text-decoration: underline;
              }
            }

            &:not(:last-child) {
              margin-bottom: 16px;
            }
          }
        }
      }

      .right {
        margin-left: 40px;
        flex-grow: 1;
        color: #b3b3b3;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: normal;
      }
    }
  }
}
</style>
