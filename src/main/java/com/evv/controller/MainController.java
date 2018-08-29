package com.evv.controller;

import com.evv.model.*;
import com.evv.service.ICardService;
import com.evv.service.ILessonService;
import com.evv.service.ISectionService;
import com.evv.service.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequestMapping(value = "/")
public class MainController {

  @Autowired
  private ISectionService sectionService;

  @Autowired
  private ICardService cardService;

  @Autowired
  private ILessonService lessonService;

  @Autowired
  private ITagService tagService;

  @RequestMapping(value = "/section/{id}", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public Section getSectionById(@PathVariable Integer id) {
    Section result = sectionService.getSectionById(id);
    return result;
  }

  @RequestMapping(value = "/sections", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<Section> getAllSections() {
    List<Section> result = sectionService.findAllSections();
    return result;
  }

  @RequestMapping(value = "/save_section", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveSection(@RequestBody Section section) {
    Integer id = sectionService.save(section);
    return id;
  }

  @RequestMapping(value = "/delete_section", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer deleteSection(@RequestBody Section section) {
    sectionService.deleteSection(section);
    return section.getId();
  }

  @RequestMapping(value = "/saveorupdate_section", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveOrUpdateSection(@RequestBody Section section) {
    sectionService.saveOrUpdateSection(section);
    return section.getId();
  }

  @RequestMapping(value = "/save_card", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveCard(@RequestParam(value = "qAudioFile", required=false) MultipartFile fileQ,
                          @RequestParam(value = "aAudioFile", required=false) MultipartFile fileA,
                          @RequestParam(value = "cardImageFile", required=false) MultipartFile fileImg,
                          @ModelAttribute Card card) throws IOException {
    card = convertCard(card);
    card.setqAudio((fileQ != null) ? fileQ.getBytes() : null);
    card.setaAudio((fileA != null) ? fileA.getBytes() : null);
    card.setCardImage((fileImg != null) ? fileImg.getBytes() : null);
    Integer id = cardService.save(card);
    return id;
  }

  @RequestMapping(value = "/cards", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<Card> getAllCards() {
    List<Card> result = cardService.findAllCards();
    return result;
  }

  @RequestMapping(value = "/section_cards", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<Card> getAllSectionsCards(@RequestBody Section section) {
    List<Card> result = cardService.findAllSectionsCards(section);
    return result;
  }

  @RequestMapping(value = "/delete_card", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer deleteCard(@RequestBody Card card) {
    cardService.deleteCard(card);
    return card.getId();
  }

  @RequestMapping(value = "/saveorupdate_card", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveOrUpdateCard(@RequestParam(value = "qAudioFile", required=false) MultipartFile fileQ,
                                  @RequestParam(value = "aAudioFile", required=false) MultipartFile fileA,
                                  @RequestParam(value = "cardImageFile", required=false) MultipartFile fileImg,
                                  @ModelAttribute Card card) throws IOException {
    card = convertCard(card);
    card.setqAudio((fileQ != null) ? fileQ.getBytes() : null);
    card.setaAudio((fileA != null) ? fileA.getBytes() : null);
    card.setCardImage((fileImg != null) ? fileImg.getBytes() : null);
    cardService.saveOrUpdateCard(card);
    return card.getId();
  }

  @RequestMapping(value = "/tag/{id}", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public Tag getTagById(@PathVariable Integer id) {
    Tag result = tagService.getTagById(id);
    return result;
  }

  @RequestMapping(value = "/tags", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<Tag> getAllTags() {
    List<Tag> result = tagService.findAllTags();
    return result;
  }

  @RequestMapping(value = "/save_tag", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveTag(@RequestBody Tag tag) {
    Integer id = tagService.save(tag);
    return id;
  }

  @RequestMapping(value = "/delete_tag", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer deleteTag(@RequestBody Tag tag) {
    tagService.deleteTag(tag);
    return tag.getId();
  }

  @RequestMapping(value = "/saveorupdate_tag", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveOrUpdateTag(@RequestBody Tag tag) {
    tagService.saveOrUpdateTag(tag);
    return tag.getId();
  }

  @RequestMapping(value = "/lessons", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<Lesson> getAllLessons() {
    List<Lesson> result = lessonService.findAllLessons();
    return result;
  }

  @RequestMapping(value = "/save_lesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveLesson(@RequestBody Lesson lesson) {
    Integer id = lessonService.save(lesson);
    return id;
  }

  @RequestMapping(value = "/delete_lesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer deleteLesson(@RequestBody Lesson lesson) {
    lessonService.deleteLesson(lesson);
    return lesson.getId();
  }

  @RequestMapping(value = "/saveorupdate_lesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveOrUpdateLesson(@RequestBody Lesson lesson) {
    lessonService.saveOrUpdateLesson(lesson);
    return lesson.getId();
  }

  @RequestMapping(value = "/lessoncards", method = RequestMethod.GET)
  @CrossOrigin
  @ResponseBody
  public List<LessonCard> getAllLessonCards() {
    List<LessonCard> result = lessonService.findAllLessonCard();
    return result;
  }

  @RequestMapping(value = "/saveorupdate_lessoncard", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer saveOrUpdateLessonCard(@RequestBody LessonCard lessonCard) {
    lessonService.saveOrUpdateLessonCard(lessonCard);
    return 5;//lessonCard.getLessonCardId().getIdCard();
  }

  @RequestMapping(value = "/delete_lessoncard", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Integer deleteLessonCard(@RequestBody LessonCard lessonCard) {
    lessonService.deleteLessonCard(lessonCard);
    return 5;//lessonCard.getLessonCardId().getIdCard();
  }

  @RequestMapping(value = "/cards_forlesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<Card> getAllCardsForLesson(@RequestBody Lesson lesson) {
    List<Card> result = cardService.findAllCardsForLesson(lesson);
    return result;
  }

  @RequestMapping(value = "/lessoncards_forlesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<LessonCard> getAllLessonCardsForLesson(@RequestBody Lesson lesson) {
    List<LessonCard> result = lessonService.findAllLessonCardsForLesson(lesson);
    return result;
  }

  @RequestMapping(value = "/lessoncards_startlesson", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<LessonCard> getAllLessonCardsToStartLesson(@RequestBody Lesson lesson) {
    List<LessonCard> result = lessonService.findAllLessonCardsToStartLesson(lesson);
    return result;
  }

  @RequestMapping(value = "/cards_byfilter", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<Card> getCardsByFilter(@RequestBody CardFilter cardFilter) {
    List<Card> result = cardService.findCardsByFilter(cardFilter);
    return result;
  }

  @RequestMapping(value = "/range_cards_byfilter", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public List<Card> getRangeCardsByFilter(@RequestBody CardFilter cardFilter) {
    List<Card> result = cardService.findRangeCardsByFilter(cardFilter, cardFilter.getFromPage(), cardFilter.getSizePage());
    return result;
  }

  @RequestMapping(value = "/count_cards_byfilter", method = RequestMethod.POST)
  @CrossOrigin
  @ResponseBody
  public Long getCountCardsByFilter(@RequestBody CardFilter cardFilter) {
    Long result = cardService.rowCountCardsByFilter(cardFilter);
    return result;
  }

  public String convertLatin1ToUtf8(String str){
    return new String(str.getBytes(Charset.forName("ISO-8859-1")), Charset.forName("UTF-8"));
  }

  public Card convertCard(Card card){
    card.setaInfo(convertLatin1ToUtf8(card.getaInfo()));
    card.setqInfo(convertLatin1ToUtf8(card.getqInfo()));
    card.setAnswer(convertLatin1ToUtf8(card.getAnswer()));
    card.setQuestion(convertLatin1ToUtf8(card.getQuestion()));
    return card;
  }

}
