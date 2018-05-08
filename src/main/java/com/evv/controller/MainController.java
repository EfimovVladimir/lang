package com.evv.controller;

import com.evv.model.Card;
import com.evv.model.Section;
import com.evv.service.ICardService;
import com.evv.service.ISectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping(value = "/")
public class MainController {

  @Autowired
  private ISectionService sectionService;

  @Autowired
  private ICardService cardService;

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
    card.setqAudio((fileQ != null) ? fileQ.getBytes() : null);
    card.setaAudio((fileA != null) ? fileA.getBytes() : null);
    card.setCardImage((fileImg != null) ? fileImg.getBytes() : null);
    cardService.saveOrUpdateCard(card);
    return card.getId();
  }

}
